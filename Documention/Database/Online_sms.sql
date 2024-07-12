USE [master]
GO
/****** Object:  Database [Online_sms]    Script Date: 7/11/2024 7:33:00 PM ******/
CREATE DATABASE [Online_sms]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Online_sms', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Online_sms.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Online_sms_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Online_sms_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Online_sms] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Online_sms].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Online_sms] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Online_sms] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Online_sms] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Online_sms] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Online_sms] SET ARITHABORT OFF 
GO
ALTER DATABASE [Online_sms] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Online_sms] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Online_sms] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Online_sms] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Online_sms] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Online_sms] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Online_sms] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Online_sms] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Online_sms] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Online_sms] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Online_sms] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Online_sms] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Online_sms] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Online_sms] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Online_sms] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Online_sms] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [Online_sms] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Online_sms] SET RECOVERY FULL 
GO
ALTER DATABASE [Online_sms] SET  MULTI_USER 
GO
ALTER DATABASE [Online_sms] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Online_sms] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Online_sms] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Online_sms] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Online_sms] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Online_sms] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Online_sms', N'ON'
GO
ALTER DATABASE [Online_sms] SET QUERY_STORE = ON
GO
ALTER DATABASE [Online_sms] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Online_sms]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 7/11/2024 7:33:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contact]    Script Date: 7/11/2024 7:33:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contact](
	[contact_id] [int] IDENTITY(1,1) NOT NULL,
	[User_id] [int] NOT NULL,
	[name] [nvarchar](max) NOT NULL,
	[phone] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED 
(
	[contact_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Friends]    Script Date: 7/11/2024 7:33:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Friends](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[User_Id] [int] NOT NULL,
	[Friend_Id] [int] NOT NULL,
	[isAccepted] [bit] NOT NULL,
	[CreateAt] [datetime2](7) NOT NULL,
	[FriendUserUser_id] [int] NULL,
 CONSTRAINT [PK_Friends] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Messages]    Script Date: 7/11/2024 7:33:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Messages](
	[Message_Id] [int] IDENTITY(1,1) NOT NULL,
	[Room_Id] [int] NOT NULL,
	[User_Id] [int] NOT NULL,
	[Message] [nvarchar](max) NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Messages] PRIMARY KEY CLUSTERED 
(
	[Message_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 7/11/2024 7:33:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[Payment_Id] [int] IDENTITY(1,1) NOT NULL,
	[User_Id] [int] NOT NULL,
	[Card_number] [nvarchar](max) NOT NULL,
	[ExpiryDate] [datetime2](7) NOT NULL,
	[Cvv] [nvarchar](max) NOT NULL,
	[Create_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[Payment_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rooms]    Script Date: 7/11/2024 7:33:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rooms](
	[Room_Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[UpdatedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Rooms] PRIMARY KEY CLUSTERED 
(
	[Room_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subscriptions]    Script Date: 7/11/2024 7:33:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subscriptions](
	[SubscriptionId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[ChatLimit] [int] NOT NULL,
	[enddate] [datetime2](7) NOT NULL,
	[Create_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Subscriptions] PRIMARY KEY CLUSTERED 
(
	[SubscriptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 7/11/2024 7:33:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[User_id] [int] IDENTITY(1,1) NOT NULL,
	[User_name] [nvarchar](max) NOT NULL,
	[Fullname] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[Phone_Number] [nvarchar](max) NOT NULL,
	[Image] [nvarchar](max) NULL,
	[DOB] [datetime2](7) NOT NULL,
	[gender] [int] NOT NULL,
	[MaritalStatus] [bit] NULL,
	[Address] [nvarchar](max) NULL,
	[Hobbies] [nvarchar](max) NULL,
	[Likes] [nvarchar](max) NULL,
	[Dislikes] [nvarchar](max) NULL,
	[Cuisines] [nvarchar](max) NULL,
	[Sports] [nvarchar](max) NULL,
	[Qualifications] [nvarchar](max) NULL,
	[School] [nvarchar](max) NULL,
	[College] [nvarchar](max) NULL,
	[Work_Status] [int] NULL,
	[Designation] [nvarchar](max) NULL,
	[Organisation] [nvarchar](max) NULL,
	[Balance] [decimal](18, 2) NOT NULL,
	[Subcription_id] [int] NOT NULL,
	[SubscriptionEndDate] [datetime2](7) NOT NULL,
	[IsEmailConfirmed] [bit] NOT NULL,
	[ConfirmationCode] [nvarchar](max) NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[UpdatedAt] [datetime2](7) NOT NULL,
	[SubscriptionId] [int] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[User_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_Contact_User_id]    Script Date: 7/11/2024 7:33:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_Contact_User_id] ON [dbo].[Contact]
(
	[User_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Friends_FriendUserUser_id]    Script Date: 7/11/2024 7:33:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_Friends_FriendUserUser_id] ON [dbo].[Friends]
(
	[FriendUserUser_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Friends_User_Id]    Script Date: 7/11/2024 7:33:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_Friends_User_Id] ON [dbo].[Friends]
(
	[User_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Messages_Room_Id]    Script Date: 7/11/2024 7:33:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_Messages_Room_Id] ON [dbo].[Messages]
(
	[Room_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Messages_User_Id]    Script Date: 7/11/2024 7:33:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_Messages_User_Id] ON [dbo].[Messages]
(
	[User_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Payment_User_Id]    Script Date: 7/11/2024 7:33:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_Payment_User_Id] ON [dbo].[Payment]
(
	[User_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Users_Subcription_id]    Script Date: 7/11/2024 7:33:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_Users_Subcription_id] ON [dbo].[Users]
(
	[Subcription_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Users_SubscriptionId]    Script Date: 7/11/2024 7:33:01 PM ******/
CREATE NONCLUSTERED INDEX [IX_Users_SubscriptionId] ON [dbo].[Users]
(
	[SubscriptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Messages] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Rooms] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Rooms] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Contact]  WITH CHECK ADD  CONSTRAINT [FK_Contact_Users_User_id] FOREIGN KEY([User_id])
REFERENCES [dbo].[Users] ([User_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Contact] CHECK CONSTRAINT [FK_Contact_Users_User_id]
GO
ALTER TABLE [dbo].[Friends]  WITH CHECK ADD  CONSTRAINT [FK_Friends_Users_FriendUserUser_id] FOREIGN KEY([FriendUserUser_id])
REFERENCES [dbo].[Users] ([User_id])
GO
ALTER TABLE [dbo].[Friends] CHECK CONSTRAINT [FK_Friends_Users_FriendUserUser_id]
GO
ALTER TABLE [dbo].[Friends]  WITH CHECK ADD  CONSTRAINT [FK_Friends_Users_User_Id] FOREIGN KEY([User_Id])
REFERENCES [dbo].[Users] ([User_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Friends] CHECK CONSTRAINT [FK_Friends_Users_User_Id]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_Messages_Rooms_Room_Id] FOREIGN KEY([Room_Id])
REFERENCES [dbo].[Rooms] ([Room_Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_Messages_Rooms_Room_Id]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_Messages_Users_User_Id] FOREIGN KEY([User_Id])
REFERENCES [dbo].[Users] ([User_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_Messages_Users_User_Id]
GO
ALTER TABLE [dbo].[Payment]  WITH CHECK ADD  CONSTRAINT [FK_Payment_Users_User_Id] FOREIGN KEY([User_Id])
REFERENCES [dbo].[Users] ([User_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Payment] CHECK CONSTRAINT [FK_Payment_Users_User_Id]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Subscriptions_Subcription_id] FOREIGN KEY([Subcription_id])
REFERENCES [dbo].[Subscriptions] ([SubscriptionId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Subscriptions_Subcription_id]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Subscriptions_SubscriptionId] FOREIGN KEY([SubscriptionId])
REFERENCES [dbo].[Subscriptions] ([SubscriptionId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Subscriptions_SubscriptionId]
GO
USE [master]
GO
ALTER DATABASE [Online_sms] SET  READ_WRITE 
GO
