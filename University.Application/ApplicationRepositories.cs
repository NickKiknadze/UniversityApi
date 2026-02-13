using University.Data.Repositories;
using University.Data.Repositories.Interfaces;

namespace University.Application;

public static class ApplicationRepositories
{
    public static void RegisterRepositoriesDependencyConfiguration(this IServiceCollection services)
    {
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IFacultyRepository, FacultyRepository>();
        services.AddScoped<ICourseRepository, CourseRepository>();
        services.AddScoped<IAssignmentRepository, AssignmentRepository>();
        services.AddScoped<IStudentGradeRepository, StudentGradeRepository>();
        services.AddScoped<IClassSessionRepository, ClassSessionRepository>();
    }
}