using University.Data.Data;
using University.Data.Data.Entities;
using University.Data.Repositories.Interfaces;

namespace University.Data.Repositories
{
    public class ClassSessionRepository : GenericRepository<ClassSession>, IClassSessionRepository
    {
        public ClassSessionRepository(AppDbContext context) : base(context)
        {
        }
    }
}
