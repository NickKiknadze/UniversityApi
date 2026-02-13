using University.Domain.Enums;
using University.Domain.Models.CourseModels;
using University.Domain.Models.FacultyModels;
using University.Domain.Models.LecturerModels;

namespace University.Domain.Models.UserModels;

public class UserGetDto
{
    public int Id { get; set; }

    public required string FirstName { get; set; }
        
    public required string LastName { get; set; }
        
    public required int Age { get; set; }
        
    public FacultyOnlyDto? Faculty { get; set; }

    public ICollection<LecturerOnlyDto> Lecturers { get; set; } = new List<LecturerOnlyDto>();

    public ICollection<CourseOnlyDto> Courses { get; set; } = new List<CourseOnlyDto>();
    
    public ICollection<UserOnlyDto> Students { get; set; } = new List<UserOnlyDto>();

    public UserType UserType { get; set; }
    public string? ProfilePictureUrl { get; set; }
}