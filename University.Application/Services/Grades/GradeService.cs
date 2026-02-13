using Microsoft.EntityFrameworkCore;
using University.Domain.Models.GradeModels;
using University.Domain.Models;
using University.Data.Data.Entities;
using University.Data.Repositories.Interfaces;
using University.Domain.CustomResponses;

namespace University.Application.Services.Grades;

public class GradeService(IStudentGradeRepository repository) : IGradeService
{
    public async Task<ApiResponse<GetDtoWithCount<GradeGetDto[]>>> GetAll(int? assignmentId, int? userId, Paging paging, CancellationToken cancellationToken)
    {
        var query = repository.AllAsNoTracking
            .Include(g => g.Assignment)
            .Include(g => g.User).ThenInclude(u => u.UserProfile)
            .AsQueryable();

        if (assignmentId.HasValue)
            query = query.Where(x => x.AssignmentId == assignmentId);
            
        if (userId.HasValue)
            query = query.Where(x => x.UserId == userId);

        var totalCount = await query.CountAsync(cancellationToken);

        var result = await query
            .Skip(paging.Offset ?? 0)
            .Take(paging.Limit ?? 10)
            .Select(x => new GradeGetDto
            {
                Id = x.Id,
                AssignmentId = x.AssignmentId,
                AssignmentTitle = x.Assignment.Title,
                UserId = x.UserId,
                UserName = x.User.UserProfile.FirstName + " " + x.User.UserProfile.LastName,
                Points = x.Points,
                Feedback = x.Feedback,
                GradedDate = x.GradedDate
            })
            .ToArrayAsync(cancellationToken);

        return ApiResponse<GetDtoWithCount<GradeGetDto[]>>.SuccessResult(new GetDtoWithCount<GradeGetDto[]>
        {
            Data = result,
            Count = totalCount
        });
    }

    public async Task CreateOrUpdate(GradePostDto dto, CancellationToken cancellationToken)
    {
        var existingGrade = await repository.All
            .FirstOrDefaultAsync(x => x.AssignmentId == dto.AssignmentId && x.UserId == dto.UserId, cancellationToken);

        if (existingGrade != null)
        {
            existingGrade.Points = dto.Points;
            existingGrade.Feedback = dto.Feedback;
            existingGrade.GradedDate = DateTime.UtcNow;
            await repository.UpdateAsync(existingGrade, cancellationToken);
        }
        else
        {
            var newGrade = new StudentGrade
            {
                AssignmentId = dto.AssignmentId,
                UserId = dto.UserId,
                Points = dto.Points,
                Feedback = dto.Feedback,
                GradedDate = DateTime.UtcNow
            };
            await repository.AddAsync(newGrade, cancellationToken);
        }
    }
}
