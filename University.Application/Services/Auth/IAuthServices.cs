using University.Domain.Models.AuthModels;
using University.Domain.Models.UserModels;

namespace University.Application.Services.Auth;

public interface IAuthServices
{
    Task<AuthTokenResponse> Login(AuthModel request, CancellationToken cancellationToken);
    Task<AuthTokenResponse> Register(UserPostDto request, CancellationToken cancellationToken);
}