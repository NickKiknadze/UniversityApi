using Microsoft.EntityFrameworkCore;
using University.Application.PublicHelpers;
using University.Data.Repositories.Interfaces;
using University.Domain.CustomExceptions;
using University.Domain.Models.AuthModels;
using University.Application.Services.Users.Helpers;
using University.Domain.Models.UserModels;
using University.Data.Data.Entities;

namespace University.Application.Services.Auth;

public class AuthServices(IHttpContextAccessor httpContextAccessor, IUserRepository userRepository, IConfiguration configuration) : IAuthServices
{
    public async Task<AuthTokenResponse> Login(AuthModel request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.Username))
            throw new BadRequestException("Username is required.");
        
        if (string.IsNullOrEmpty(request.Password))
            throw new BadRequestException("Password is required.");
        
        var user = await userRepository.AllAsNoTracking
            .Include(u => u.UserProfile)
            .SingleOrDefaultAsync(u => u.Username == request.Username && u.IsActive, cancellationToken);
        
        if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
            throw new AuthorizationDeniedException("Invalid credentials.");

        httpContextAccessor.HttpContext?.Session.SetInt32("UserId", user.Id);
        
        string role = user.UserType.ToString();

        var signInUser = new SignInUserModel
        {
            UserId = user.Id,
            Username = user.Username,
            Fullname = user.UserProfile != null ? $"{user.UserProfile.FirstName} {user.UserProfile.LastName}" : "N/A",
            SecurityStamp = user.PasswordHash,
            IsActive = user.IsActive,
            Password = user.PasswordHash,
            Role = role,
            Department = "N/A",
            Extension = "N/A",
            AvatarImage = user.UserProfile?.ProfilePictureUrl
        };
        
        var generateToken = GenerateJwtToken.Execute(signInUser, configuration);
        
        return generateToken;
    }

    public async Task<AuthTokenResponse> Register(UserPostDto request, CancellationToken cancellationToken)
    {
        var userExists = await userRepository.AllAsNoTracking.AnyAsync(u => u.Username == request.UserName && u.IsActive, cancellationToken);

        if (userExists)
            throw new BadRequestException($"User already exists with this username: {request.UserName}");

        var user = new User
        {
            Username = request.UserName,
            PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Password, BCrypt.Net.HashType.SHA384),
            UserType = request.UserType
        };

        user = user.FillData(request);

        user.UserProfile = new UserProfile
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Age = request.Age,
            FacultyId = request.FacultyId
        };
        
        await userRepository.AddAsync(user, cancellationToken);
        
        var authModel = new AuthModel { Username = request.UserName, Password = request.Password };
        return await Login(authModel, cancellationToken);
    }
    
    private static bool VerifyPassword(string? password, string hashedPassword)
    {
        var test = BCrypt.Net.BCrypt.EnhancedHashPassword(password, BCrypt.Net.HashType.SHA384);
        return BCrypt.Net.BCrypt.EnhancedVerify(password, hashedPassword);
    }
}