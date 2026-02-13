using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using University.Application.Services.Schedule;
using University.Domain.Models.ScheduleModels;

namespace University.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController(IScheduleService scheduleService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] ScheduleGetFilter filter, CancellationToken cancellationToken)
            => Ok(await scheduleService.GetAll(filter, cancellationToken));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
            => Ok(await scheduleService.GetById(id, cancellationToken));

        [HttpPost]
        [Authorize(Roles = "Admin,Lecturer")]
        public async Task<IActionResult> Create([FromBody] ClassSessionPostDto dto, CancellationToken cancellationToken)
        {
            await scheduleService.Create(dto, cancellationToken);
            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "Admin,Lecturer")]
        public async Task<IActionResult> Update([FromBody] ClassSessionPutDto dto, CancellationToken cancellationToken)
        {
            await scheduleService.Update(dto, cancellationToken);
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Lecturer")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            await scheduleService.Delete(id, cancellationToken);
            return Ok();
        }
    }
}
