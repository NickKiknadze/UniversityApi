using University.Data.Data.Entities;
using University.Domain.Models.CourseModels;
using University.Domain.Models.FacultyModels;
using University.Domain.Models.LecturerModels;
using University.Domain.Models.UserModels;
using University.Domain.Enums;

namespace University.Application.Services.Users.Helpers;

public static class DataMapper
{
    public static IQueryable<UserGetDto> MapDataToUserGetDto(this IQueryable<User> users)
    {
        return users.Select(user => new UserGetDto
        {
            Id = user.Id,
            FirstName = user.UserProfile.FirstName,
            LastName = user.UserProfile.LastName,
            Age = user.UserProfile.Age,
            UserType = user.UserType,
            Faculty = user.UserProfile != null && user.UserProfile.Faculty != null ? new FacultyOnlyDto
            {
                Id = user.UserProfile.Faculty.Id,
                FacultyName = user.UserProfile.Faculty.FacultyName
            } : null,
            Courses = user.UserType == UserType.Student 
                ? user.StudentCourses.Where(sc => sc.Course.IsActive).Select(sc => new CourseOnlyDto { Id = sc.Course.Id, CourseName = sc.Course.CourseName }).ToList()
                : user.CoursesLecturers.Where(cl => cl.Course.IsActive).Select(cl => new CourseOnlyDto { Id = cl.Course.Id, CourseName = cl.Course.CourseName }).ToList(),
            Lecturers = user.UserType == UserType.Student
                ? user.StudentLecturersAsStudent.Where(sl => sl.Lecturer.IsActive).Select(sl => new LecturerOnlyDto 
                { 
                    Id = sl.Lecturer.Id, 
                    FirstName = sl.Lecturer.UserProfile.FirstName, 
                    LastName = sl.Lecturer.UserProfile.LastName,
                    Age = sl.Lecturer.UserProfile.Age
                }).ToList()
                : new List<LecturerOnlyDto>(),
            Students = user.UserType == UserType.Lecturer
                ? user.StudentLecturersAsLecturer.Where(sl => sl.Student.IsActive).Select(sl => new UserOnlyDto
                {
                    Id = sl.Student.Id,
                    FirstName = sl.Student.UserProfile.FirstName,
                    LastName = sl.Student.UserProfile.LastName,
                    Age = sl.Student.UserProfile.Age
                }).ToList()
                : new List<UserOnlyDto>()
        });
    }
}