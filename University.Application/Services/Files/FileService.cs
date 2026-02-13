namespace University.Application.Services.Files;

public class FileService(IWebHostEnvironment environment) : IFileService
{
    private static readonly string[] allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx"];
    public async Task<string> SaveFileAsync(IFormFile file)
    {
        ArgumentNullException.ThrowIfNull(file);

        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (string.IsNullOrEmpty(extension) || !allowedExtensions.Contains(extension))
        {
            throw new ArgumentException($"Invalid file extension. Allowed extensions are: {string.Join(", ", allowedExtensions)}");
        }

        var uploadsFolder = Path.Combine(environment.WebRootPath, "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var uniqueFileName = Guid.NewGuid().ToString() + extension;
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(fileStream);
        }

        return $"/uploads/{uniqueFileName}";
    }

    public void DeleteFile(string filePath)
    {
        if (string.IsNullOrEmpty(filePath))
        {
            return;
        }

        var fullPath = Path.Combine(environment.WebRootPath, filePath.TrimStart('/').Replace("/", "\\"));
        if (File.Exists(fullPath))
        {
            File.Delete(fullPath);
        }
    }
}
