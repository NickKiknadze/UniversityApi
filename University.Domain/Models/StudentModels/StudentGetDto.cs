using University.Domain.Models.CourseModels;
using University.Domain.Models.LecturerModels;

namespace University.Domain.Models.StudentModels;

public class StudentGetDto
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required int Age { get; set; }
    public int UserId { get; set; }
    public ICollection<LecturerOnlyDto> Lecturers { get; set; } = new List<LecturerOnlyDto>();
    public ICollection<CourseOnlyDto> Courses { get; set; } = new List<CourseOnlyDto>();
}
