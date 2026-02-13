using Microsoft.EntityFrameworkCore;
using University.Domain.Models.AssignmentModels;
using University.Domain.Models;
using University.Data.Data.Entities;
using University.Domain.CustomExceptions;
using University.Data.Repositories.Interfaces;
using University.Domain.CustomResponses;

namespace University.Application.Services.Assignments;

public class AssignmentService(IAssignmentRepository repository) : IAssignmentService
{
    public async Task<ApiResponse<GetDtoWithCount<AssignmentGetDto[]>>> GetAll(AssignmentGetFilter filter, CancellationToken cancellationToken)
    {
        var query = repository.AllAsNoTracking
            .Include(a => a.Course)
            .AsQueryable();

        if (filter.Id.HasValue)
            query = query.Where(x => x.Id == filter.Id);
            
        if (!string.IsNullOrEmpty(filter.Title))
            query = query.Where(x => x.Title.Contains(filter.Title));
            
        if (filter.CourseId.HasValue)
            query = query.Where(x => x.CourseId == filter.CourseId);

        var totalCount = await query.CountAsync(cancellationToken);

        var result = await query
            .Skip(filter.Offset ?? 0)
            .Take(filter.Limit ?? 10)
            .Select(x => new AssignmentGetDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                CourseId = x.CourseId,
                CourseName = x.Course != null ? x.Course.CourseName : null,
                MaxPoints = x.MaxPoints,
                DueDate = x.DueDate
            })
            .ToArrayAsync(cancellationToken);

        return ApiResponse<GetDtoWithCount<AssignmentGetDto[]>>.SuccessResult(new GetDtoWithCount<AssignmentGetDto[]>
        {
            Data = result,
            Count = totalCount
        });
    }

    public async Task<AssignmentGetDto> GetById(int id, CancellationToken cancellationToken)
    {
        var assignment = await repository.AllAsNoTracking
            .Include(a => a.Course)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (assignment == null)
            throw new NotFoundException($"Assignment with id {id} not found");

        return new AssignmentGetDto
        {
            Id = assignment.Id,
            Title = assignment.Title,
            Description = assignment.Description,
            CourseId = assignment.CourseId,
            CourseName = assignment.Course?.CourseName,
            MaxPoints = assignment.MaxPoints,
            DueDate = assignment.DueDate
        };
    }

    public async Task Create(AssignmentPostDto dto, CancellationToken cancellationToken)
    {
        var assignment = new Assignment
        {
            Title = dto.Title,
            Description = dto.Description,
            CourseId = dto.CourseId,
            MaxPoints = dto.MaxPoints,
            DueDate = dto.DueDate
        };

        await repository.AddAsync(assignment, cancellationToken);
    }

    public async Task Update(AssignmentPutDto dto, CancellationToken cancellationToken)
    {
        var assignment = await repository.GetByIdAsync(dto.Id, cancellationToken);
        if (assignment == null)
            throw new NotFoundException($"Assignment with id {dto.Id} not found");

        assignment.Title = dto.Title;
        assignment.Description = dto.Description;
        assignment.CourseId = dto.CourseId;
        assignment.MaxPoints = dto.MaxPoints;
        assignment.DueDate = dto.DueDate;

        await repository.UpdateAsync(assignment, cancellationToken);
    }

    public async Task Delete(int id, CancellationToken cancellationToken)
    {
        var assignment = await repository.GetByIdAsync(id, cancellationToken);
        if (assignment == null)
            throw new NotFoundException($"Assignment with id {id} not found");

        assignment.IsActive = false;

        await repository.UpdateAsync(assignment, cancellationToken);
    }
}
