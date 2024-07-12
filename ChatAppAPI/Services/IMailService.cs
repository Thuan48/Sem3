using ChatAppAPI.Models;

namespace ChatAppAPI.Services
{
    public interface IMailService
    {
        public Task SendMailAsync(MailRequest mailRequest);
    }
}
