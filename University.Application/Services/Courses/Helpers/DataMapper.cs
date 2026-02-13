using Microsoft.EntityFrameworkCore;
using University.Data.Data.Entities;
using University.Domain.Models.CourseModels;
using University.Domain.Models.FacultyModels;
using University.Domain.Models.LecturerModels;
using University.Domain.Models.UserModels;

namespace University.Application.Services.Courses.Helpers;

public static class DataMapper
{
    public static IQueryable<CourseGetDto> MapToCourseGetDto(this IQueryable<Course> courses)
    {
        return courses
            .Include(x => x.FacultyCourses)
            .Include(x => x.CoursesLecturers)
            .Include(x => x.StudentCourses)
            .Select(course => new CourseGetDto
        {
            Id = course.Id,
            CourseName = course.CourseName,
            Faculties = course.FacultyCourses
                .Where(ul => ul.Faculty.IsActive)
                .Select(c => new FacultyOnlyDto
                {
                    Id = c.FacultyId,
                    FacultyName = c.Faculty.FacultyName
                }).ToList(),
            Lecturers = course.CoursesLecturers
                .Where(x => x.User.IsActive)
                .Select(c => new LecturerOnlyDto
                {
                    Id = c.User.Id,
                    FirstName = c.User.UserProfile.FirstName,
                    LastName = c.User.UserProfile.LastName,
                    Age = c.User.UserProfile.Age
                }).ToList(),
            Users = course.StudentCourses
                .Where(sc => sc.User.IsActive)
                .Select(sc => new UserOnlyDto
                {
                    Id = sc.User.Id,
                    FirstName = sc.User.UserProfile.FirstName,
                    LastName = sc.User.UserProfile.LastName,
                    Age = sc.User.UserProfile.Age
                }).ToList()
        });
    }
}