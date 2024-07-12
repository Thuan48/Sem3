using ChatAppAPI.Interfaces;
using ChatAppAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.RegularExpressions;

namespace ChatAppAPI.Repositories
{
    public class ChatRepo : IChatRepo
    {
        private readonly DatabaseContext _context;
        private readonly IAuthRepo _authRepo;

        public ChatRepo(DatabaseContext context, IAuthRepo authRepo)
        {
            _context = context;
            _authRepo = authRepo;
        }

        public async Task<CustomResult> GetChatRooms(string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if(user == null)
            {
                return new CustomResult(404, "User not found", null);
            }

            var roomNumberList = await _context.Messages
                .Where(c => c.UserId == user.Id)
                .GroupBy(c => c.ChatRoomId)
                .Select(g => g.Key)
                .ToListAsync();


            var roomMessage = await _context.Messages
                .Where(r => roomNumberList.Contains(r.ChatRoomId))
                .Include(r => r.User)
                .GroupBy(c => c.ChatRoomId)
                .Select(g => new
                {
                    roomId = g.Key,
                    messages = g.ToList(),
                })
                .ToListAsync();

            return new CustomResult(200, "success", roomMessage);
        }

        public async Task<CustomPaging> GetMessages(int roomId, int pageNumber, int pageSize)
        {
            var messages = await _context.Messages.Where(m => m.ChatRoomId == roomId).Include(m => m.User).OrderByDescending(m => m.CreatedAt).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            var total = _context.Messages.Count();


            if (messages.Count == 0)
            {
                return new CustomPaging() { 
                    Status = 400,
                    Message = "Bad Request",
                  
                    Data = null
                };
            }

            var customPaging = new CustomPaging()
            {
                Status = 200,
                Message = "OK",
                CurrentPage = pageNumber,
                TotalPages = (total / pageSize),
                PageSize = pageSize,
                TotalCount = total,
                Data = messages
            };

            return customPaging;
        }

        public async Task<CustomResult> SaveMessage(ChatConnection chatConnection)
        {
            var message = new ChatRoomMessage()
            {
                ChatRoomId = int.Parse(chatConnection.RoomId),
                UserId = chatConnection.Id,
                Message = chatConnection.Message,
            };

            _context.Messages.Add(message);

            await _context.SaveChangesAsync();

            return new CustomResult(200, "save message", message);
        }
        public async Task<CustomResult> AddFriendToChatRoom(int userId, int friendId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u=>u.Id==userId);
            var friend = await _context.Users.FirstOrDefaultAsync(f => f.Id == friendId);
            Console.WriteLine($"AddFriendToChatRoom called with userId: {userId}, friendId: {friendId}");
            if (user == null)
            {
                return new CustomResult(404, "User not found", null);
            }
            if(friend == null)
            {
                return new CustomResult(404, "friend not found", null);
            }
            var description = GenerateRandomDescription();
            var chatRoom = new ChatRoom
            {
                Description = description,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
            _context.ChatRooms.Add(chatRoom);
            await _context.SaveChangesAsync();

            var userMessage = new ChatRoomMessage
            {
                ChatRoomId = chatRoom.RoomId,
                UserId = user.Id,
                Message = "User added to chat room",
                CreatedAt = DateTime.Now
            };
            var friendMessage = new ChatRoomMessage
            {
                ChatRoomId = chatRoom.RoomId,
                UserId = friend.Id,
                Message = "Friend added to chat room",
                CreatedAt = DateTime.Now
            };

            _context.Messages.Add(userMessage);
            _context.Messages.Add(friendMessage);
            await _context.SaveChangesAsync();

            return new CustomResult(200, "Users added to chat room", chatRoom);
        }

        private string GenerateRandomDescription()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            var result = new string(
                Enumerable.Repeat(chars, 10)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());
            return result;
        }

        public async Task<CustomResult> SearchUser(string search)
        {
            var list = await _context.Users.Where(u => u.Email.Contains(search)).Take(10).ToListAsync();

            return new CustomResult(200, "done", list);
        }
    }
}
