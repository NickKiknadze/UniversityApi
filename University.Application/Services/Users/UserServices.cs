using Microsoft.EntityFrameworkCore;
using University.Application.Services.Users.Helpers;
using University.Data.Data.Entities;
using University.Data.Repositories.Interfaces;
using University.Domain.CustomExceptions;
using University.Domain.CustomResponses;
using University.Domain.Models;
using University.Domain.Models.UserModels;
using University.Domain.Enums;

namespace University.Application.Services.Users;

public class UserServices(IUserRepository userRepository) : IUserServices
{
    public async Task<ApiResponse<GetDtoWithCount<ICollection<UserGetDto>>>> Get(UserGetFilter filter,
        CancellationToken cancellationToken)
    {
        var users = userRepository.AllAsNoTracking.FilterData(filter);

        var result = await users
            .MapDataToUserGetDto()
            .AsSplitQuery()
            .OrderByDescending(u => u.Id)
            .Skip(filter.Offset ?? 0)
            .Take(filter.Limit ?? 10)
            .ToListAsync(cancellationToken);

        return ApiResponse<GetDtoWithCount<ICollection<UserGetDto>>>.SuccessResult(
            new GetDtoWithCount<ICollection<UserGetDto>>
            {
                Data = result,
                Count = await users.CountAsync(cancellationToken)
            });
    }

    public async Task Create(UserPostDto input, CancellationToken cancellationToken)
    {
        var userExists =
            await userRepository.AllAsNoTracking.AnyAsync(u => u.Username == input.UserName && u.IsActive,
                cancellationToken);

        if (userExists)
            throw new BadRequestException($"User already exists with this username: {input.UserName}");

        var user = new User
        {
            Username = input.UserName,
            PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(input.Password, BCrypt.Net.HashType.SHA384),
            UserType = input.UserType
        };

        user.UserProfile = new UserProfile
        {
            FirstName = input.FirstName,
            LastName = input.LastName,
            Age = input.Age,
            FacultyId = input.FacultyId,
            ProfilePictureUrl = input.ProfilePictureUrl
        };

        if (input.UserType == UserType.Student)
        {
            if (input.CourseIds != null)
            {
                user.StudentCourses = input.CourseIds.Select(id => new StudentCourse { CourseId = id }).ToList();
            }
            if (input.LecturerIds != null)
            {
                user.StudentLecturersAsStudent = input.LecturerIds.Select(id => new StudentLecturer { LecturerUserId = id }).ToList();
            }
        }
        else if (input.UserType == UserType.Lecturer)
        {
            if (input.CourseIds != null)
            {
                user.CoursesLecturers = input.CourseIds.Select(id => new CourseLecturer { CourseId = id }).ToList();
            }
        }

        await userRepository.AddAsync(user, cancellationToken);
    }

    public async Task Update(UserPutDto input, CancellationToken cancellationToken)
    {
        var user = await userRepository.All
            .Include(u => u.UserProfile)
            .Include(u => u.StudentCourses)
            .Include(u => u.CoursesLecturers)
            .Include(u => u.StudentLecturersAsStudent)
            .Include(u => u.StudentLecturersAsLecturer)
            .Where(u => u.Id == input.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (user is null)
            throw new NotFoundException("User not found");

        user.UserType = input.UserType;
        if (user.UserProfile != null)
        {
            user.UserProfile.FirstName = input.FirstName;
            user.UserProfile.LastName = input.LastName;
            user.UserProfile.Age = input.Age;
            user.UserProfile.FacultyId = input.FacultyId;
            user.UserProfile.ProfilePictureUrl = input.ProfilePictureUrl;
        }

        if (user.UserType == UserType.Student)
        {
            user.StudentCourses.Clear();
            if (input.CourseIds != null)
            {
                foreach (var id in input.CourseIds)
                    user.StudentCourses.Add(new StudentCourse { CourseId = id });
            }

            user.StudentLecturersAsStudent.Clear();
            if (input.LecturerIds != null)
            {
                foreach (var id in input.LecturerIds)
                    user.StudentLecturersAsStudent.Add(new StudentLecturer { LecturerUserId = id });
            }
        }
        else if (user.UserType == UserType.Lecturer)
        {
            user.CoursesLecturers.Clear();
            if (input.CourseIds != null)
            {
                foreach (var id in input.CourseIds)
                    user.CoursesLecturers.Add(new CourseLecturer { CourseId = id });
            }
        }

        await userRepository.UpdateAsync(user ,cancellationToken);
    }

    public async Task Delete(int userId, CancellationToken cancellationToken)
    {
        var user = await userRepository.All
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken: cancellationToken);

        if (user == null)
            throw new NotFoundException("User not found");

        user.IsActive = false;

        await userRepository.UpdateAsync(user ,cancellationToken);
    }
}