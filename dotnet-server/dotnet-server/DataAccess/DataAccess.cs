

using dotnet_server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.Json;

namespace dotnet_server.DataAccess;

public class DataAccess : IDataAccess
{
    private IServiceScopeFactory _scope;
    public DataAccess(IServiceScopeFactory scope)
    {
        _scope = scope;;
    }
    public void NewUser(string username, string password, string email, string picture)
    {
        using (var scope = _scope.CreateScope())
        {
            var context = scope.ServiceProvider.GetService<AppDbContext>();
            context.Users.Add(new User()
            {
                Id = Guid.NewGuid().ToString(),
                Name = username,
                PasswordHash = password,
                Surveys = new List<Survey>(),
                Picture= picture

            });
            context.SaveChanges();
        }
    }
    public string NewSurvey(string userId, string title, List<Question> questions)
    {
        using (var scope = _scope.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            string id = Guid.NewGuid().ToString();
            Survey survey = new Survey()
            {
                Id = id,
                Title = title,
                SurveyResponses = new List<SurveyResponse>(),
                UsedIps = new List<UsedIps>(),
                IsPublic = true,
                Date = DateTime.Now,
                Owner = context.Users.FirstOrDefault(x => x.Id == userId),
            };
            foreach (var question in questions)
            {
                question.Survey = survey; 
            }
            survey.Questions= questions;
            context.Surveys.Add(survey);
            context.SaveChanges();
            return id;
        }
    }
    public Survey GetSurvey(string id)
    {
        using (var scope = _scope.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var survey = context.Surveys.Include(s => s.SurveyResponses) // Include the SurveyResponses collection within the Survey entity
                                    .Include(s => s.Questions) // Include the Questions collection within the Survey entity
                                        .ThenInclude(q => q.Pa) // Include the PossibleAnswers collection within the Questions entity
                                    .Include(s => s.UsedIps).
                                    Include(x => x.Owner).FirstOrDefault(x => x.Id == id); 
            return survey ?? new Survey();
        }
    }

    public User GetUser(string username)
    {
        using(var scope = _scope.CreateScope())
        { 
            var context = scope.ServiceProvider.GetService<AppDbContext>();
            User user = context.Users.FirstOrDefault(x => x.Name == username);
            return user ?? new User();
        }
    }
    public void NewResponse(string surveyId, string ip, string response)
    {
        using (var scope = _scope.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            Survey survey = context.Surveys.Include(x => x.SurveyResponses).Include(x => x.UsedIps).FirstOrDefault(x => x.Id == surveyId) ?? new Survey();
            survey.SurveyResponses.Add(new SurveyResponse() { Id = Guid.NewGuid().ToString(), Response = response, Survey = survey});
            survey.UsedIps.Add(new UsedIps() { Id = Guid.NewGuid().ToString(), Ip = ip });
            context.SaveChanges();
        }
    }
    public List<SurveyResponse> GetResponses(string surveyId)
    {
        using (var scope = _scope.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            Survey survey = context.Surveys.Include(x => x.SurveyResponses).FirstOrDefault(y => y.Id == surveyId);
            
            return survey.SurveyResponses == null ? survey.SurveyResponses.ToList() : new List<SurveyResponse>();
        }
    }
    public List<Survey> GetUserSurveys(string id)
    {
        using (var scope = _scope.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            List<Survey> surveys =context.Surveys.Include(s => s.SurveyResponses) // Include the SurveyResponses collection within the Survey entity
                                    .Include(s => s.Questions) // Include the Questions collection within the Survey entity
                                        .ThenInclude(q => q.Pa) // Include the PossibleAnswers collection within the Questions entity
                                    .Include(s => s.UsedIps).
                                    Include(x => x.Owner).Where(x => x.Owner.Id == id).ToList();
            return surveys;
        }
    }
    public Survey GetSurveysLite(string id)
    {
        using (var scope = _scope.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var survey =  context.Surveys.Include(s => s.SurveyResponses) // Include the SurveyResponses collection within the Survey entity
                                    .Include(s => s.Questions) // Include the Questions collection within the Survey entity
                                        .ThenInclude(q => q.Pa) // Include the PossibleAnswers collection within the Questions entity
                                    .Include(s => s.UsedIps).
                                    Include(x => x.Owner).FirstOrDefault(x => x.Id == id);
            return survey ?? new Survey();
        }
    }
    public bool CheckIp(string id, string ip)
    {
        using (var scope = _scope.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            Survey survey = context.Surveys.Include(x => x.UsedIps).FirstOrDefault(x => x.Id == id);
            bool result = survey.UsedIps.Any(x => x.Ip == ip);
            return result;
        }
    }
}
