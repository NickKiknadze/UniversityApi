using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace University.Data.Data.Entities;

[Table("Courses", Schema = "dbo")]
public sealed class Course
{
    [Key]
    public int Id { get; set; }
    [MaxLength(50)]
    public required string CourseName { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<FacultyCourse> FacultyCourses { get; set; } = new HashSet<FacultyCourse>();
    public ICollection<CourseLecturer> CoursesLecturers { get; set; } = new HashSet<CourseLecturer>();
    public ICollection<StudentCourse> StudentCourses { get; set; } = new HashSet<StudentCourse>();
    public ICollection<Assignment> Assignments { get; set; } = new HashSet<Assignment>();
}