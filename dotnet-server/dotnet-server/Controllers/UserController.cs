using dotnet_server.DataAccess;
using dotnet_server.Models;
using dotnet_server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
