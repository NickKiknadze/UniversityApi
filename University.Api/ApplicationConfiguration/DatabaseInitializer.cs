using Microsoft.EntityFrameworkCore;
using University.Data.Data;

namespace University.Api.ApplicationConfiguration;

public static class DatabaseInitializer
{
    public static void Initialize(IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var services = scope.ServiceProvider;
        
        try
        {
            var context = services.GetRequiredService<AppDbContext>();

            context.Database.Migrate();
        }
        catch (Exception ex)
        {
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            var logger = loggerFactory.CreateLogger(nameof(DatabaseInitializer));
            logger.LogError(ex, "An error occurred while migrating the database.");
            throw;
        }
    }
}
