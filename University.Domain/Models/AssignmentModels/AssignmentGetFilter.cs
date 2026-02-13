namespace University.Domain.Models.AssignmentModels;

public class AssignmentGetFilter : Paging
{
    public int? Id { get; set; }
    public string? Title { get; set; }
    public int? CourseId { get; set; }
}
