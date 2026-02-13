using System.ComponentModel.DataAnnotations.Schema;

namespace University.Data.Data.Entities;

[Table("CoursesLecturers", Schema = "dbo")]
public sealed class CourseLecturer
{
    public int CourseId { get; set; }
    public int UserId { get; set; }
    public Course Course { get; set; }
    public User User { get; set; }
}