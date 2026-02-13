using Microsoft.EntityFrameworkCore;
using University.Data.Data.Entities;
using University.Domain.Models.UserModels;
using University.Domain.Enums;

namespace University.Application.Services.Users.Helpers;

public static class FilterDataHelper
{
    public static IQueryable<User> FilterData(this IQueryable<User> query, UserGetFilter filter)
    {
        query = query.Where(u => u.IsActive == filter.IsActive);
        
        if (filter.UserType.HasValue)
        {
            query = query.Where(u => u.UserType == filter.UserType.Value);
        }

        if (filter.Id != null)
        {
            query = query.Where(u => u.Id == filter.Id);
        }
        if (!string.IsNullOrEmpty(filter.FirstName))
        {
            query = query.Where(u => u.UserProfile.FirstName.Contains(filter.FirstName));
        }
        if(!string.IsNullOrEmpty(filter.LastName))
        {
            query = query.Where(u => u.UserProfile.LastName.Contains(filter.LastName));
        }
        if(filter.Age != null)
        {
            query = query.Where(u => u.UserProfile.Age == filter.Age);
        }
        if(filter.FacultyId != null)
        {
            query = query.Where(u => u.UserProfile.FacultyId == filter.FacultyId);
        }
        
        if (filter.CourseIds is { Count: > 0 })
        {
            query = query.Where(u => u.StudentCourses.Any(sc => filter.CourseIds.Contains(sc.CourseId)) || 
                                     u.CoursesLecturers.Any(cl => filter.CourseIds.Contains(cl.CourseId)));
        }
        
        if (filter.LecturerIds is { Count: > 0 })
        {
            query = query.Where(u => u.StudentLecturersAsStudent.Any(sl => filter.LecturerIds.Contains(sl.LecturerUserId)));
        }

        return query;
    } 
}