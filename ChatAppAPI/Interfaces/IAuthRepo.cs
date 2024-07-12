using ChatAppAPI.Models;

namespace ChatAppAPI.Interfaces
{
    public interface IAuthRepo
    {
        public Task<CustomResult> Login(UserLogin userLogin);

        public Task<User> Authenticate(UserLogin userLogin);

        public string CreateToken(User user, DateTime expire);

        public Task<CustomResult> SetEmailConfirm(string email);

        public Task<CustomResult> GetUser(string email);
    }
}
