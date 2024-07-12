using Microsoft.EntityFrameworkCore;

namespace ChatAppAPI.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<ChatRoom> ChatRooms { get; set; }

        public DbSet<ChatRoomMessage> Messages { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(options =>
            {
                options.HasKey(u => u.Id);

                options.Property(u => u.IsEmailConfirmed).HasDefaultValue(true);
                options.Property(u => u.CreatedAt).HasDefaultValueSql("GETDATE()");
                options.Property(u => u.UpdatedAt).HasDefaultValueSql("GETDATE()");


                var listUser = new List<User>();

                string[] listImage = ["12.jpg",
                                    "3.webp",
                                    "4.png",
                                    "5.png",
                                    "6.png",
                                    "7.jpg",
                                    "8.jpg",
                                    "9.webp",
                                    "10.png",
                                    "11.jpg"];

                Random random = new Random();

                for (int i = 6; i < 1007; i++)
                {
                    listUser.Add(new User()
                    {
                        Id = i + 1,
                        Email = Faker.Name.First() + Faker.Name.Suffix() + "@gmail.com",
                        Password = "$2a$12$C1JQMjVl3bfXxtISNXv9Sulqsu/nEOx.yhtIozwvUW/DHWevhhQYG",
                        PhoneNumber = Faker.Phone.Number(),
                        Address = Faker.Address.StreetAddress(),
                        IsEmailConfirmed = true,
                        Image = listImage[random.Next(listImage.Length)]

                    });
                }


                options.HasData(listUser);

                modelBuilder.Entity<ChatRoom>(options =>
                {
                    options.HasKey(c => c.RoomId);
                    options.Property(u => u.CreatedAt).HasDefaultValueSql("GETDATE()");
                    options.Property(u => u.UpdatedAt).HasDefaultValueSql("GETDATE()");
                });

                modelBuilder.Entity<ChatRoomMessage>(options =>
                {
                    options.HasKey(c => c.MessageId);
                    options.HasOne(c => c.User).WithMany(u => u.Messages).HasForeignKey(c => c.UserId);
                    options.HasOne(c => c.ChatRoom).WithMany(c => c.Messages).HasForeignKey(c => c.ChatRoomId);

                    options.Property(u => u.CreatedAt).HasDefaultValueSql("GETDATE()");


                });


            });
        }
    } 
}
