using University.Domain.Models.ScheduleModels;
using University.Domain.Models;
using University.Domain.CustomResponses;

namespace University.Application.Services.Schedule
{
    public interface IScheduleService
    {
        Task<ApiResponse<GetDtoWithCount<ClassSessionGetDto[]>>> GetAll(ScheduleGetFilter filter, CancellationToken cancellationToken);
        Task<ClassSessionGetDto> GetById(int id, CancellationToken cancellationToken);
        Task Create(ClassSessionPostDto dto, CancellationToken cancellationToken);
        Task Update(ClassSessionPutDto dto, CancellationToken cancellationToken);
        Task Delete(int id, CancellationToken cancellationToken);
    }
}
