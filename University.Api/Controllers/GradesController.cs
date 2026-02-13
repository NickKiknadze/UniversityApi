using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using University.Application.Services.Grades;
using University.Domain.Models;
using University.Domain.Models.GradeModels;

namespace University.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class GradesController(IGradeService gradeService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int? assignmentId, 
        [FromQuery] int? userId, 
        [FromQuery] Paging paging, 
        CancellationToken cancellationToken)
        => Ok(await gradeService.GetAll(assignmentId, userId, paging, cancellationToken));

    [HttpPost]
    public async Task<IActionResult> CreateOrUpdate([FromBody] GradePostDto dto, CancellationToken cancellationToken)
    {
        await gradeService.CreateOrUpdate(dto, cancellationToken);
        return Ok();
    }
}
