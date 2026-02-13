namespace University.Application.Services.Files;

public interface IFileService
{
    Task<string> SaveFileAsync(IFormFile file);
    void DeleteFile(string filePath);
}
