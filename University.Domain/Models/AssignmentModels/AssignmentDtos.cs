using System.ComponentModel.DataAnnotations;

namespace University.Domain.Models.AssignmentModels;

public class AssignmentGetDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int CourseId { get; set; }
    public string? CourseName { get; set; }
    public decimal MaxPoints { get; set; }
    public DateTime? DueDate { get; set; }
}

public class AssignmentPostDto
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? Description { get; set; }
    
    [Required]
    public int CourseId { get; set; }
    
    public decimal MaxPoints { get; set; } = 100;
    
    public DateTime? DueDate { get; set; }
}

public class AssignmentPutDto : AssignmentPostDto
{
    public int Id { get; set; }
}
