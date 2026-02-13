using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using University.Application.Services.Files;
using University.Domain.CustomResponses;

namespace University.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController(IFileService fileService) : ControllerBase
    {
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                var fileUrl = await fileService.SaveFileAsync(file);
                return Ok(ApiResponse<string>.SuccessResult(fileUrl));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResponse<string>.ErrorResult(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.ErrorResult("An error occurred while uploading the file."));
            }
        }
    }
}
