using Microsoft.EntityFrameworkCore;
using University.Domain.Models.ScheduleModels;
using University.Domain.Models;
using University.Data.Data.Entities;
using University.Domain.CustomExceptions;
using University.Data.Repositories.Interfaces;
using University.Domain.CustomResponses;

namespace University.Application.Services.Schedule;

public class ScheduleService(IClassSessionRepository repository) : IScheduleService
{
    public async Task<ApiResponse<GetDtoWithCount<ClassSessionGetDto[]>>> GetAll(ScheduleGetFilter filter, CancellationToken cancellationToken)
    {
        var query = repository.AllAsNoTracking
            .Include(s => s.Course)
                .ThenInclude(c => c.CoursesLecturers) // For Lecturer filter
            .AsQueryable();

        if (filter.CourseId.HasValue)
            query = query.Where(x => x.CourseId == filter.CourseId);

        if (filter.DayOfWeek.HasValue)
            query = query.Where(x => x.DayOfWeek == filter.DayOfWeek);


        if (filter.StudentId.HasValue)
            query = query.Where(x => x.Course.StudentCourses.Any(sc => sc.UserId == filter.StudentId));

        if (filter.LecturerId.HasValue)
            query = query.Where(x => x.Course.CoursesLecturers.Any(cl => cl.UserId == filter.LecturerId));

        var totalCount = await query.CountAsync(cancellationToken);

        var result = await query
            .Skip(filter.Offset ?? 0)
            .Take(filter.Limit ?? 10)
            .Select(x => new ClassSessionGetDto
            {
                Id = x.Id,
                CourseId = x.CourseId,
                CourseName = x.Course.CourseName,
                DayOfWeek = x.DayOfWeek,
                StartTime = x.StartTime,
                EndTime = x.EndTime,
                Location = x.Location
            })
            .ToArrayAsync(cancellationToken);

        return ApiResponse<GetDtoWithCount<ClassSessionGetDto[]>>.SuccessResult(new GetDtoWithCount<ClassSessionGetDto[]>
        {
            Data = result,
            Count = totalCount
        });
    }

    public async Task<ClassSessionGetDto> GetById(int id, CancellationToken cancellationToken)
    {
        var session = await repository.AllAsNoTracking
            .Include(s => s.Course)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (session == null)
            throw new NotFoundException($"Class session with id {id} not found");

        return new ClassSessionGetDto
        {
            Id = session.Id,
            CourseId = session.CourseId,
            CourseName = session.Course.CourseName,
            DayOfWeek = session.DayOfWeek,
            StartTime = session.StartTime,
            EndTime = session.EndTime,
            Location = session.Location
        };
    }

    public async Task Create(ClassSessionPostDto dto, CancellationToken cancellationToken)
    {
        var entity = new ClassSession
        {
            CourseId = dto.CourseId,
            DayOfWeek = dto.DayOfWeek,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            Location = dto.Location
        };

        await repository.AddAsync(entity, cancellationToken);
    }

    public async Task Update(ClassSessionPutDto dto, CancellationToken cancellationToken)
    {
        var entity = await repository.GetByIdAsync(dto.Id, cancellationToken);
        if (entity == null)
            throw new NotFoundException($"Class session with id {dto.Id} not found");

        entity.CourseId = dto.CourseId;
        entity.DayOfWeek = dto.DayOfWeek;
        entity.StartTime = dto.StartTime;
        entity.EndTime = dto.EndTime;
        entity.Location = dto.Location;

        await repository.UpdateAsync(entity, cancellationToken);
    }

    public async Task Delete(int id, CancellationToken cancellationToken)
    {
        var entity = await repository.GetByIdAsync(id, cancellationToken);
        if (entity == null)
            throw new NotFoundException($"Class session with id {id} not found");

        await repository.RemoveAsync(id, cancellationToken);
    }
}
