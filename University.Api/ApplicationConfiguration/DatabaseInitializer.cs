using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
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
            // Retry loop for migration
            int maxRetries = 10;
            int delaySeconds = 5;

            for (int i = 0; i < maxRetries; i++)
            {
                try
                {
                    context.Database.Migrate();
                    return; // Migration successful
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Migration attempt {i + 1} failed: {ex.Message}");
                    if (i == maxRetries - 1) throw; // Throw on last attempt
                    Thread.Sleep(TimeSpan.FromSeconds(delaySeconds));
                }
            }
            Console.WriteLine("Database migration completed successfully.");
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred while migrating the database.");
            throw; // Re-throw to fail fast if DB is not accessible
        }
    }
}
