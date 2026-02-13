using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using University.Application.Services.Auth;
using University.Domain.Models.AuthModels;
using University.Domain.Models.UserModels;

namespace University.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthServices authServices) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthModel request, CancellationToken cancellationToken)
        => Ok(await authServices.Login(request, cancellationToken));

    [HttpPost("register")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Register([FromBody] UserPostDto request, CancellationToken cancellationToken)
        => Ok(await authServices.Register(request, cancellationToken));
}