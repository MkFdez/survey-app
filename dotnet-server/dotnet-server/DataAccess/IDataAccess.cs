using dotnet_server.Models;

namespace dotnet_server.DataAccess
{
    public interface IDataAccess
    {
        bool CheckIp(string id, string ip);
        List<SurveyResponse> GetResponses(string surveyId);
        Survey GetSurvey(string id);
        User GetUser(string username);
        Survey GetSurveysLite(string id);
        List<Survey> GetUserSurveys(string id);
        void NewResponse(string surveyId, string ip, string response);
        int CheckUser(string username, string email);
        string NewSurvey(string userId, string title, List<Question> questions);
        void NewUser(string username, string password, string email, string picture);
    }
}