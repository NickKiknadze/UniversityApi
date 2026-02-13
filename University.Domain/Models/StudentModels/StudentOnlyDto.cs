namespace University.Domain.Models.StudentModels;

public class StudentOnlyDto
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required int Age { get; set; }
}
