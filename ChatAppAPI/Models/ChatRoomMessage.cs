using System.ComponentModel.DataAnnotations;

namespace ChatAppAPI.Models
{
    public class ChatRoomMessage
    {

        [Key]
        public int MessageId { get; set; }

        public int ChatRoomId { get; set; }

        public int UserId { get; set; }

        public string? Message { get; set; }

        public DateTime CreatedAt { get; set; }

        public virtual User? User { get; set; }

        public virtual ChatRoom? ChatRoom { get; set; }
    }
}
