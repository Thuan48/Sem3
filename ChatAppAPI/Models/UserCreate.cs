namespace ChatAppAPI.Models
{
    public class UserCreate
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string? PhoneNumber { get; set; }

        public DateTime DOB { get; set; }

        public string? DOBString { get; set; }
    }
}
