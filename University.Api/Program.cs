using University.Api.ApplicationConfiguration;
using University.Api.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.ConfigureBuilder();

var app = builder.Build();

app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

app.ConfigureApp(app.Environment);

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

Console.WriteLine("Starting application...");
app.Run();