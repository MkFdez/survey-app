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
    [Route("api/[controller]")]
    public class SurveyController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;
        public SurveyController(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }
        [HttpGet("")]
        public IActionResult Index(string id)
        {
            Survey survey = _dataAccess.GetSurvey(id);
            var jsoned = Jsoner.ToJsonSurvey(survey);
            return Ok(jsoned.ToString());
        }
        [HttpPost("")]
        [Authorize]
        public IActionResult Index( PostSurveyModel survey)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = User.Identity.Name;
            List<Question> questions = new();
            foreach(var q in survey.questions)
            {
                var temp = new Question()
                {
                    Id = Guid.NewGuid().ToString(),
                    M = q.m,
                    T = q.t,
                    Q = q.q,
                    Pa = q.pa.Select(x => new PossibleAnswer() { A = x.a, T = x.t, Id = Guid.NewGuid().ToString() }).ToList(),
                };
                questions.Add(temp);
            }
            string id = _dataAccess.NewSurvey(userId, survey.title, questions);
            return Ok(new { id = id });
        }

        [HttpPost("finish")]
        public IActionResult Finish([FromBody] PostRespondeModel response)
        {
            _dataAccess.NewResponse(response.surveyId, response.ip, response.response);
            return Ok();
        }
        [HttpGet("info")]
        public IActionResult Info(string surveyId) 
        {
            
            var survey = _dataAccess.GetSurveysLite(surveyId);
            var responses = survey.SurveyResponses.ToList();
            var jsoned = Jsoner.ToJsonResponseList(responses);
            var jsoned2 = Jsoner.ToJsonSurvey(survey);
            var json = new JObject();
            json["responses"] = jsoned["data"];
            json["moreData"] = jsoned2;
            return Ok(json.ToString());
        }
        [HttpGet("checkip")]
        public IActionResult CheckIp( string id, string ip )
        {
            bool result = _dataAccess.CheckIp(id, ip);
            return Ok(new {exist = result});
        }
    }
}
