using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University.Domain.Enums;

namespace University.Data.Data.Entities;

[Table("Users", Schema = "dbo")]
public sealed class User
{
    [Key]
    public int Id { get; set; }
    [MaxLength(20)]
    public required string Username { get; set; }
    [MaxLength(70)]
    public required string PasswordHash { get; set; }
    public bool IsActive { get; set; } = true;
    public UserType UserType { get; set; } = UserType.Student;

    public UserProfile? UserProfile { get; set; }

    public ICollection<StudentCourse> StudentCourses { get; set; } = new HashSet<StudentCourse>();
    public ICollection<CourseLecturer> CoursesLecturers { get; set; } = new HashSet<CourseLecturer>();
    public ICollection<StudentGrade> StudentGrades { get; set; } = new HashSet<StudentGrade>();
    public ICollection<StudentLecturer> StudentLecturersAsStudent { get; set; } = new HashSet<StudentLecturer>();
    public ICollection<StudentLecturer> StudentLecturersAsLecturer { get; set; } = new HashSet<StudentLecturer>();
}