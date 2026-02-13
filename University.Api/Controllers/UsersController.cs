using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using University.Application.Services.Users;
using University.Domain.Models;
using University.Domain.Models.UserModels;

namespace University.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController(IUserServices userServices) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<GetDtoWithCount<UserGetDto>>> GetUsersAsync(
        [FromQuery] UserGetFilter filter, 
        CancellationToken cancellationToken)
        => Ok(await userServices.Get(filter, cancellationToken));

    [HttpPost]
    public async Task<ActionResult> PostUsersAsync(UserPostDto input, CancellationToken cancellationToken)
    {
        await userServices.Create(input, cancellationToken);
        return Ok();
    }

    [HttpPut]
    public async Task<ActionResult> PutUserAsync(UserPutDto input, CancellationToken cancellationToken)
    {
        await userServices.Update(input, cancellationToken);
        return Ok();
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteUserAsync(int userId, CancellationToken cancellationToken)
    {
        await userServices.Delete(userId, cancellationToken);
        return Ok();
    }
}
