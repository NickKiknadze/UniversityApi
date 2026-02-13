namespace University.Domain.Models.StudentModels;

public class StudentPutDto
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required int Age { get; set; }
    public ICollection<int>? CourseIds { get; set; }
    public ICollection<int>? LecturerIds { get; set; }
}
