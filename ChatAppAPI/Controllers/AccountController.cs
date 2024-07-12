using ChatAppAPI.Interfaces;
using ChatAppAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ChatAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepo _accountRepo;

        public AccountController(IAccountRepo accountRepo)
        {
            _accountRepo = accountRepo;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromForm]UserCreate userCreate)
        {
            var customStatus = await _accountRepo.Register(userCreate);

            return Ok(customStatus);
        }

        [HttpPut]
        [Route("avatar")]
        [Authorize]
        public async Task<IActionResult> UploadAvatar([FromForm]IFormFile uploadImage)
        {
            var email = User.FindFirst(ClaimTypes.Email).Value;

            var customResult = await _accountRepo.UploadImage(email, uploadImage);

            return Ok(customResult);
        }
    }
}
