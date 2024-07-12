using ChatAppAPI.Models;

namespace ChatAppAPI.Interfaces
{
    public interface IAccountRepo
    {

        public Task<CustomResult> Register(UserCreate userCreate);

        public Task<bool> CheckEmailUnique(string email);

        public Task<bool> CheckPhoneUnique(string phone);

        public Task<CustomResult> UploadImage(string email, IFormFile uploadImage);

    }
}
