using ChatAppAPI.Models;

namespace ChatAppAPI.Interfaces
{
    public interface IChatRepo
    {
        public Task<CustomResult> GetChatRooms(string email);

        public Task<CustomResult> SaveMessage(ChatConnection chatConnection);

        public Task<CustomPaging> GetMessages(int roomId, int pageNumber, int pageSize);

        public Task<CustomResult> SearchUser(string search);

        public Task<CustomResult> AddFriendToChatRoom(int userId, int friendId);

    }
}
