using University.Domain.Models.CourseModels;
using University.Domain.Models.UserModels;

namespace University.Domain.Models.LecturerModels;

public class LecturerGetDto
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required int Age { get; set; }
    public int? UserId { get; set; }
    public ICollection<UserOnlyDto> Users { get; set; } = new List<UserOnlyDto>();
    public ICollection<CourseOnlyDto> Courses { get; set; } = new List<CourseOnlyDto>();
}