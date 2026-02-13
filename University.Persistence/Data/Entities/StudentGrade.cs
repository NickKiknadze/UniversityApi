using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace University.Data.Data.Entities;

[Table("StudentGrades", Schema = "dbo")]
public sealed class StudentGrade
{
    [Key]
    public int Id { get; set; }

    public int AssignmentId { get; set; }
    [ForeignKey(nameof(AssignmentId))]
    public Assignment? Assignment { get; set; }

    public int UserId { get; set; }
    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }

    public decimal Points { get; set; }
    
    [MaxLength(500)]
    public string? Feedback { get; set; }
    
    public DateTime GradedDate { get; set; } = DateTime.UtcNow;
}
