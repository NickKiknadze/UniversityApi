using University.Domain.CustomResponses;
using University.Domain.Models;
using University.Domain.Models.GradeModels;

namespace University.Application.Services.Grades;

public interface IGradeService
{
    Task<ApiResponse<GetDtoWithCount<GradeGetDto[]>>> GetAll(int? assignmentId, int? userId, Paging paging, CancellationToken cancellationToken);
    Task CreateOrUpdate(GradePostDto dto, CancellationToken cancellationToken);
}
