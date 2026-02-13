using System.ComponentModel.DataAnnotations.Schema;

namespace University.Data.Data.Entities;

[Table("StudentCourses", Schema = "dbo")]
public sealed class StudentCourse
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public int CourseId { get; set; }
    public Course Course { get; set; } = null!;
}
