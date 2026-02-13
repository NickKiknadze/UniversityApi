using University.Application.Services.Auth;
using University.Application.Services.Courses;
using University.Application.Services.Excel;
using University.Application.Services.Faculties;
using University.Application.Services.Identity;
using University.Application.Services.Users;
using University.Application.Services.Assignments;
using University.Application.Services.Grades;
using University.Application.Services.Schedule;
using University.Application.Services.Files;

namespace University.Application;

public static class ApplicationServices
{
    public static void RegisterServicesDependencyConfiguration(this IServiceCollection services)
    {
        services.AddScoped<ICourseServices, CourseServices>();
        services.AddScoped<IFacultyServices, FacultyServices>();
        services.AddScoped<IUserServices, UserServices>();
        services.AddScoped<IAuthServices, AuthServices>();
        services.AddScoped<IUserIdentity, UserIdentity>();
        services.AddScoped<IExcelServices, ExcelServices>();
        services.AddScoped<IAssignmentService, AssignmentService>();
        services.AddScoped<IGradeService, GradeService>();
        services.AddScoped<IScheduleService, ScheduleService>();
        services.AddScoped<IFileService, FileService>();
    }
}