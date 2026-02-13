namespace University.Domain.Models.StudentModels;

public class StudentPostDto
{
    public required int UserId { get; set; }
    public ICollection<int>? CourseIds { get; set; }
    public ICollection<int>? LecturerIds { get; set; }
}
