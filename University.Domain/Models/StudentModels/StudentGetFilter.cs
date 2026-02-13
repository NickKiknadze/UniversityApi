namespace University.Domain.Models.StudentModels;

public class StudentGetFilter : Paging
{
    public int? Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int? Age { get; set; }
    public bool IsActive { get; set; } = true;
    public ICollection<int>? CourseIds { get; set; }
    public ICollection<int>? LecturerIds { get; set; }
}
