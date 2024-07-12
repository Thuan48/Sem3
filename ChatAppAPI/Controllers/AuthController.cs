using ChatAppAPI.Interfaces;
using ChatAppAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ChatAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthRepo _authRepo;


        public AuthController(IAuthRepo authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var email = User.FindFirst(ClaimTypes.Email).Value;

            var customStatus = await _authRepo.GetUser(email);
            return Ok(customStatus);
        }


        [HttpPost]
        public async Task<IActionResult> Login([FromForm]UserLogin userLogin)
        {
            var customStatus = await _authRepo.Login(userLogin);

            return Ok(customStatus);
        }


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> ConfirmEmail()
        {
            var email = User.FindFirst(ClaimTypes.Email).Value;

            return Ok(await _authRepo.SetEmailConfirm(email));
        }


    }


}
