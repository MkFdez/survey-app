using dotnet_server.Models;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UploadController : ControllerBase
    {
        [HttpPost("")]
        public async Task<IActionResult> Index([FromForm] FormDataModel model)
        {
            // Access the ID
            var id = model.Id;

            // Access the uploaded image file
            var imageFile = model.Image;

            if (imageFile == null || imageFile.Length <= 0)
            {
                return BadRequest("No image file uploaded.");
            }

            // Create the directory path for saving the image
            var uploadPath = Path.Combine("public", "uploads", id.ToString());

            // Create the directory if it doesn't exist
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            // Generate a unique file name for the uploaded image
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);

            // Combine the upload path and file name
            var filePath = Path.Combine(uploadPath, fileName);

            // Save the image file to the server
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return Ok(new { final_path = filePath} );
        }
    }
}
