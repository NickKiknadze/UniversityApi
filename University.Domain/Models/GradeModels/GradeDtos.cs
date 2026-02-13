using System.ComponentModel.DataAnnotations;

namespace University.Domain.Models.GradeModels;

public class GradeGetDto
{
    public int Id { get; set; }
    public int AssignmentId { get; set; }
    public string AssignmentTitle { get; set; } = string.Empty;
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public decimal Points { get; set; }
    public string? Feedback { get; set; }
    public DateTime GradedDate { get; set; }
}

public class GradePostDto
{
    [Required]
    public int AssignmentId { get; set; }
    
    [Required]
    public int UserId { get; set; }
    
    [Required]
    public decimal Points { get; set; }
    
    [MaxLength(500)]
    public string? Feedback { get; set; }
}

public class GradePutDto : GradePostDto
{
    public int Id { get; set; }
}
