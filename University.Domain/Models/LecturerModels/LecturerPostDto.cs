namespace University.Domain.Models.LecturerModels;

public class LecturerPostDto
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public int Age { get; set; }
    public int UserId { get; set; }
    public ICollection<int>? UserIds { get; set; }
    public ICollection<int>? CourseIds { get; set; }
}