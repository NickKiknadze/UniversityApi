using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace University.Data.Data.Entities;

[Table("Assignments", Schema = "dbo")]
public sealed class Assignment
{
    [Key]
    public int Id { get; set; }
    
    [MaxLength(100)]
    public required string Title { get; set; }
    
    [MaxLength(500)]
    public string? Description { get; set; }
    
    public int CourseId { get; set; }
    [ForeignKey(nameof(CourseId))]
    public Course? Course { get; set; }

    public decimal MaxPoints { get; set; } = 100;
    
    public DateTime? DueDate { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<StudentGrade> StudentGrades { get; set; } = new List<StudentGrade>();
}
