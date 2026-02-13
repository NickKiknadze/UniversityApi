using System.ComponentModel.DataAnnotations.Schema;

namespace University.Data.Data.Entities;

[Table("StudentLecturers", Schema = "dbo")]
public sealed class StudentLecturer
{
    public int StudentUserId { get; set; }
    public User Student { get; set; } = null!;

    public int LecturerUserId { get; set; }
    public User Lecturer { get; set; } = null!;
}
