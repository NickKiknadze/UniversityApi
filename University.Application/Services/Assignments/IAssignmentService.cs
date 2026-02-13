using University.Domain.CustomResponses;
using University.Domain.Models;
using University.Domain.Models.AssignmentModels;

namespace University.Application.Services.Assignments;

public interface IAssignmentService
{
    Task<ApiResponse<GetDtoWithCount<AssignmentGetDto[]>>> GetAll(AssignmentGetFilter filter, CancellationToken cancellationToken);
    Task<AssignmentGetDto> GetById(int id, CancellationToken cancellationToken);
    Task Create(AssignmentPostDto dto, CancellationToken cancellationToken);
    Task Update(AssignmentPutDto dto, CancellationToken cancellationToken);
    Task Delete(int id, CancellationToken cancellationToken);
}
