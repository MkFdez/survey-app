using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace dotnet_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class CheckTokenController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Index()
        {
            return Ok();
        }
    }
}
