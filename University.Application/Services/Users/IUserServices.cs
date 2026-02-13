using University.Domain.CustomResponses;
using University.Domain.Models;
using University.Domain.Models.UserModels;

namespace University.Application.Services.Users;

public interface IUserServices
{
    Task<ApiResponse<GetDtoWithCount<ICollection<UserGetDto>>>> Get(UserGetFilter filter, CancellationToken cancellationToken);
    Task Create(UserPostDto input, CancellationToken cancellationToken);
    Task Update(UserPutDto input, CancellationToken cancellationToken);
    Task Delete(int userId, CancellationToken cancellationToken);
}