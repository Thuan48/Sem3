using ChatAppAPI.Hubs;
using ChatAppAPI.Interfaces;
using ChatAppAPI.Models;
using ChatAppAPI.Repositories;
using ChatAppAPI.Services;
using ChatAppAPI.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSignalR();

var allowOrigin = builder.Configuration.GetSection("AllowOrigin").Get<string[]>();

builder.Services.AddCors(option =>
{
    option.AddPolicy(MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowCredentials()
        .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration["JwtSettings:Key"]!
            )),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddDbContext<DatabaseContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection"));

});


builder.Services.AddTransient<IAuthRepo, AuthRepo>();
builder.Services.AddTransient<IAccountRepo, AccountRepo>();
builder.Services.AddTransient<IMailService, MailService>();
builder.Services.AddTransient<IChatRepo, ChatRepo>();

builder.Services.AddCors(option =>
{
    option.AddPolicy(MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowCredentials()
        .AllowAnyMethod();
    });
});

builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));



var app = builder.Build();


app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors(MyAllowSpecificOrigins);

app.MapHub<ChatHub>("/Chat");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
