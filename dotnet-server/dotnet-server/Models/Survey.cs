using System.ComponentModel.DataAnnotations;

namespace dotnet_server.Models;

public class Survey
{
    [Key]
    public string Id { get; set; }
    public string Title { get; set; }
    public ICollection<Question> Questions { get; set; }
    public User Owner { get; set; }
    public ICollection<SurveyResponse> SurveyResponses { get; set; }

    public ICollection<UsedIps> UsedIps { get; set; }

    public DateTime Date { get; set; }

    public bool IsPublic { get; set; }
}
