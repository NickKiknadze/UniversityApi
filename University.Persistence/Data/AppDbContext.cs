using Microsoft.EntityFrameworkCore;
using University.Data.Data.Entities;

namespace University.Data.Data;

public class AppDbContext(
    DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Assignment> Assignments { get; set; }
    public DbSet<StudentGrade> StudentGrades { get; set; }

    public DbSet<User> Users { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Faculty> Faculty { get; set; }
    public DbSet<StudentCourse> StudentCourses { get; set; }
    public DbSet<StudentLecturer> StudentLecturers { get; set; }
    public DbSet<CourseLecturer> CoursesLecturers { get; set; }
    public DbSet<FacultyCourse> FacultiesCourses { get; set; }
    public DbSet<ClassSession> ClassSessions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CourseLecturer>()
            .HasKey(n => new { n.CourseId, n.UserId });
        modelBuilder.Entity<CourseLecturer>()
            .HasOne(c => c.Course)
            .WithMany(k => k.CoursesLecturers)
            .HasForeignKey(c => c.CourseId);
        modelBuilder.Entity<CourseLecturer>()
            .HasOne(l => l.User)
            .WithMany(k => k.CoursesLecturers)
            .HasForeignKey(l => l.UserId);

        modelBuilder.Entity<FacultyCourse>()
            .HasKey(n => new { n.CourseId, n.FacultyId });
        modelBuilder.Entity<FacultyCourse>()
            .HasOne(c => c.Course)
            .WithMany(k => k.FacultyCourses)
            .HasForeignKey(c => c.CourseId);
        modelBuilder.Entity<FacultyCourse>()
            .HasOne(l => l.Faculty)
            .WithMany(k => k.FacultyCourses)
            .HasForeignKey(l => l.FacultyId);

        modelBuilder.Entity<StudentCourse>()
            .HasKey(n => new { n.UserId, n.CourseId });
        modelBuilder.Entity<StudentCourse>()
            .HasOne(s => s.User)
            .WithMany(k => k.StudentCourses)
            .HasForeignKey(s => s.UserId);
        modelBuilder.Entity<StudentCourse>()
            .HasOne(c => c.Course)
            .WithMany(k => k.StudentCourses)
            .HasForeignKey(c => c.CourseId);

        modelBuilder.Entity<StudentLecturer>()
            .HasKey(n => new { n.StudentUserId, n.LecturerUserId });
        modelBuilder.Entity<StudentLecturer>()
            .HasOne(s => s.Student)
            .WithMany(k => k.StudentLecturersAsStudent)
            .HasForeignKey(s => s.StudentUserId)
            .OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<StudentLecturer>()
            .HasOne(l => l.Lecturer)
            .WithMany(k => k.StudentLecturersAsLecturer)
            .HasForeignKey(l => l.LecturerUserId)
            .OnDelete(DeleteBehavior.NoAction);

        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }
}