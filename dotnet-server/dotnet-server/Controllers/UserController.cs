using dotnet_server.DataAccess;
using dotnet_server.Models;
using dotnet_server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Security.Claims;

namespace dotnet_server.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;
        public UserController(IDataAccess dataAccess) 
        {
            _dataAccess = dataAccess;
        }
        [HttpGet("")]
       
        public IActionResult Index()
        {
            return Ok();
        }

        [HttpPost("")]
        public IActionResult Index(RegisterModel model)
        {
            int status = _dataAccess.CheckUser(model.username, model.email);
            if(status != 0)
            {
                string message = status == 3 ? "username and email" : status == 2 ? "username" : "email";
                return BadRequest(new { error = $"{message} already exists" });
            }
            string pass = SecretHasher.Hash(model.password);
            _dataAccess.NewUser(model.username,  pass, model.email, model.picture);
            return Ok();
        }

        [HttpGet("surveys")]
        [Authorize]
        public IActionResult Surveys()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            List<Survey> surveys = _dataAccess.GetUserSurveys(userId);
            var jsoned = Jsoner.ToJsonSurveyList(surveys);
            return Ok(jsoned.ToString());
        }
    }
}
