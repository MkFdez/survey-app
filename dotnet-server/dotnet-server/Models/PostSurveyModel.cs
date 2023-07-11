namespace dotnet_server.Models;

public class PostSurveyModel
{
    public string title { get; set; }
    public  List<PostQuestion> questions { get; set; }
}
