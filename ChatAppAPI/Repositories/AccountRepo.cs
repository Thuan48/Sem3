using ChatAppAPI.Interfaces;
using ChatAppAPI.Models;
using ChatAppAPI.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace ChatAppAPI.Repositories
{
    public class AccountRepo : IAccountRepo
    {
        private readonly DatabaseContext _context;
        private readonly IMailService _mailService;
        private readonly IConfiguration _configuration;
        private readonly IAuthRepo _authRepo;
        private readonly IWebHostEnvironment _env;


        public AccountRepo(DatabaseContext context, IMailService mailService, IConfiguration configuration, IAuthRepo authRepo, IWebHostEnvironment env)
        {
            _context = context;
            _mailService = mailService;
            _configuration = configuration;
            _authRepo = authRepo;
            _env = env;
        }

        public async Task<bool> CheckEmailUnique(string email)
        {
            var account = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (account == null)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> CheckPhoneUnique(string phone)
        {
            var account = await _context.Users.SingleOrDefaultAsync(u => u.PhoneNumber == phone);

            if (account == null)
            {
                return true;
            }

            return false;
        }

        public async Task<CustomResult> Register(UserCreate userCreate)
        {
            var verified = await CheckEmailUnique(userCreate.Email);

            if(!verified)
            {
                return new CustomResult(400, "Email exist!", null);
            }

            verified = await CheckPhoneUnique(userCreate.PhoneNumber);

            if (!verified)
            {
                return new CustomResult(400, "Phone number exist!", null);
            }

            var user = new User()
            {
                Email = userCreate.Email,
                PhoneNumber = userCreate.PhoneNumber,
                Password = BCrypt.Net.BCrypt.HashPassword(userCreate.Password),
                DOB = DateTime.Parse(userCreate.DOBString)
            };

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var token = _authRepo.CreateToken(user, DateTime.Now.AddMonths(1));
                var url = $"{_configuration["ClientInfo:Url"]}/sign-in?token={token}";

                await _mailService.SendMailAsync(new MailRequest()
                {
                    ToEmail = user.Email,
                    Body = GenerateEmailBody(url),
                    Subject = "Email Confirmation for Chat App",
                    Attachments = null            
                });

                return new CustomResult(200, "created success", user);
            }catch (Exception ex)
            {
                return new CustomResult(400, ex.Message, null);
            }   
        }

        public async Task<CustomResult> UploadImage(string email, IFormFile uploadImage)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);    

            var fileName = GenerateUniqueName(uploadImage.FileName);
            var uploadPath = Path.Combine(_env.WebRootPath, "images");
            var filePath = Path.Combine(uploadPath, fileName);

            using(var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await uploadImage.CopyToAsync(fileStream);
            }

            user.Image = fileName;

            await _context.SaveChangesAsync();

            return new CustomResult(200, "Success", user);

        }

        private string GenerateEmailBody(string url)
        {
            var emailBody = $"<h1 style=\"color: red\">Email Confirm</h1>\r\n    <p style=\"font-size: 18px\">Please click on this <a href='{url}'>Link</a> to confirm your registration</p>\r\n    <h5 style=\"font-size: 17px\">Thank you</h5>";

            return emailBody;
        }

        private string GenerateUniqueName(string name)
        {
            var fileName = Path.GetFileName(name);

            return Path.GetFileNameWithoutExtension(fileName) + DateTime.Now.Ticks + Path.GetExtension(fileName);
        }

   


    }
}
