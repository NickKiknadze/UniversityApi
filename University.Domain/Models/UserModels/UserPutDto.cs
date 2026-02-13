using University.Domain.Enums;

namespace University.Domain.Models.UserModels;

public class UserPutDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public int Age { get; set; }
    public int FacultyId { get; set; }
    public ICollection<int>? LecturerIds { get; set; }
    public ICollection<int>? CourseIds { get; set; }
    public UserType UserType { get; set; }
    public string? ProfilePictureUrl { get; set; }
}