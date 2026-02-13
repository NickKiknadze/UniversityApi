using University.Data.Data;
using University.Data.Data.Entities;
using University.Data.Repositories.Interfaces;

namespace University.Data.Repositories;

public class StudentGradeRepository : GenericRepository<StudentGrade>, IStudentGradeRepository
{
    public StudentGradeRepository(AppDbContext context) : base(context)
    {
    }
}
