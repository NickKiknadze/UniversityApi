using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using University.Application.Services.Assignments;
using University.Domain.Models.AssignmentModels;

namespace University.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AssignmentsController(IAssignmentService assignmentService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] AssignmentGetFilter filter, CancellationToken cancellationToken)
        => Ok(await assignmentService.GetAll(filter, cancellationToken));

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        => Ok(await assignmentService.GetById(id, cancellationToken));

    [HttpPost]
    [Authorize(Roles = "Admin,Lecturer")]
    public async Task<IActionResult> Create([FromBody] AssignmentPostDto dto, CancellationToken cancellationToken)
    {
        await assignmentService.Create(dto, cancellationToken);
        return Ok();
    }

    [HttpPut]
    [Authorize(Roles = "Admin,Lecturer")]
    public async Task<IActionResult> Update([FromBody] AssignmentPutDto dto, CancellationToken cancellationToken)
    {
        await assignmentService.Update(dto, cancellationToken);
        return Ok();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,Lecturer")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await assignmentService.Delete(id, cancellationToken);
        return Ok();
    }
}
