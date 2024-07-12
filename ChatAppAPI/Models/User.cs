using System.ComponentModel.DataAnnotations;

namespace ChatAppAPI.Models
{
    public class User
    {

        public User() {
            Messages = new List<ChatRoomMessage>();
        }

        [Key]
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string? Image {  get; set; }

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }

        public bool IsEmailConfirmed { get; set; }

        public DateTime DOB { get; set; }

        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }

        public virtual ICollection<ChatRoomMessage> Messages { get; set; }




    }
}
