using dotnet_server.Models;
using Newtonsoft.Json.Linq;

namespace dotnet_server.Services
{
    public static class Jsoner
    {
        public static JObject ToJsonResponse(SurveyResponse response)
        {
            var json = new JObject();
            json["response"] = response.Response;
            return json;
        }
        public static JObject ToJsonPossibleAns(PossibleAnswer pa)
        {
            var json = new JObject();
            json["a"] = pa.A;
            json["t"] = pa.T;
            return json;
        }
        public static JObject ToJsonQuestion(Question question)
        {
            var json = new JObject();
            json["q"] = question.Q;
            json["m"] = question.M;
            json["t"] = question.T;
            json["pa"] = JArray.FromObject(question.Pa.Select(x => ToJsonPossibleAns(x)).ToArray());
            return json;

        }
        public static JObject ToJsonSurvey(Survey survey)
        {
            var json = new JObject();
            json["id"] = survey.Id;
            json["owner"] = "{username : '" + survey.Owner.Name + "'}";
            json["title"] = survey.Title;
            json["date"] = survey.Date;
            json["public"] = survey.IsPublic;
            json["responses"] = JArray.FromObject(survey.SurveyResponses.Select(x => ToJsonResponse(x)["response"]));
            json["questions"] = JArray.FromObject(survey.Questions.Select(x => ToJsonQuestion(x)));
            return json;
        }
        public static JObject ToJsonSurveyList(List<Survey> surveyList)
        {
            var json = new JObject();
            json["surveys"] = JArray.FromObject(surveyList.Select(x => ToJsonSurvey(x)));
            return json;
        }
        public static JObject ToJsonResponseList(List<SurveyResponse> responses) 
        {
            var json = new JObject();
            json["data"] = JArray.FromObject(responses.Select(x => ToJsonResponse(x)));
            return json;
        }
    }
}
