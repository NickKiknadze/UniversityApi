namespace University.Domain.Models.LecturerModels;

public class LecturerGetFilter : Paging
{
    public int? Id { get; set; }
    public int? UserId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int? Age { get; set; }
    public bool IsActive { get; set; } = true;
    public ICollection<int>? UserIds { get; set; }
    public ICollection<int>? CourseIds { get; set; }
}