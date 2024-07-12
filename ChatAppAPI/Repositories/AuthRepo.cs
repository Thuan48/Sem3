using ChatAppAPI.Interfaces;
using ChatAppAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ChatAppAPI.Repositories
{

    public class AuthRepo : IAuthRepo
    {
        private readonly IConfiguration _config;

        private readonly DatabaseContext _context;

        public AuthRepo(IConfiguration config, DatabaseContext context)
        {
            _config = config;
            _context = context;
        }

        public async Task<User> Authenticate(UserLogin userLogin)
        {
            var verified = await _context.Users.SingleOrDefaultAsync(u => u.Email == userLogin.Email);

            if (verified != null)
            {
                if (BCrypt.Net.BCrypt.Verify(userLogin.Password, verified.Password))
                {
                    return verified;
                }
            }

            return null;
        }

        public string CreateToken(User user, DateTime expire)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("Id", user.Id.ToString()),
            };

            var token = new JwtSecurityToken(
                    issuer: _config["JwtSettings:Issuer"],
                    audience: _config["JwtSettings:Audience"],
                    signingCredentials: credentials,
                    claims: claims,
                    expires: expire
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<CustomResult> GetUser(string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user != null)
            {

                return new CustomResult(200, "success", new UserPublic()
                {
                    Email = user.Email,
                    Image = user.Image != null ? user.Image : null,
                    Address = user.Address,
                    IsEmailConfirmed = user.IsEmailConfirmed,
                    PhoneNumber = user.PhoneNumber,
                    DOB = user.DOB,
                });
            }

            return new CustomResult(400, "something went wrong", null);
        }

        public async Task<CustomResult> Login(UserLogin userLogin)
        {
            var user = await Authenticate(userLogin);

            if (user == null)
            {
                return new CustomResult(400, "Wrong email or password", null);
            }

            var token = CreateToken(user, DateTime.Now.AddDays(5));

            return new CustomResult(200, "token created", token);
        }

        public async Task<CustomResult> SetEmailConfirm(string email)
        {

            var account = await _context.Users.SingleOrDefaultAsync(a => a.Email == email);
 
            account.IsEmailConfirmed = true;

            await _context.SaveChangesAsync();

            return new CustomResult(200, "Email Confirm Success", null);
        }
    }
}
