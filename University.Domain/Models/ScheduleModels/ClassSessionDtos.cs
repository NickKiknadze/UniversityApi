using System.ComponentModel.DataAnnotations;

namespace University.Domain.Models.ScheduleModels
{
    public class ClassSessionGetDto
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Location { get; set; }
    }

    public class ClassSessionPostDto
    {
        [Required]
        public int CourseId { get; set; }

        [Required]
        public DayOfWeek DayOfWeek { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        public string Location { get; set; }
    }

    public class ClassSessionPutDto : ClassSessionPostDto
    {
        [Required]
        public int Id { get; set; }
    }
}
