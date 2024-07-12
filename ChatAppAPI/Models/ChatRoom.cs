using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatAppAPI.Models
{
    public class ChatRoom
    {

        public ChatRoom() {
            Messages = new List<ChatRoomMessage>();
        }

        [Key]
        public int RoomId { get; set; }

        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        [NotMapped]
        public string? LastMessage {  get; set; }


        [NotMapped]
        public string? LastSendUser { get; set; }

        public virtual ICollection<ChatRoomMessage> Messages { get; set; }

    }
}
