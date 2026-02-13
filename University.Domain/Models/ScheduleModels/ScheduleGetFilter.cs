namespace University.Domain.Models.ScheduleModels
{
    public class ScheduleGetFilter : Paging
    {
        public int? CourseId { get; set; }
        public int? StudentId { get; set; }
        public int? LecturerId { get; set; }
        public DayOfWeek? DayOfWeek { get; set; }
    }
}
