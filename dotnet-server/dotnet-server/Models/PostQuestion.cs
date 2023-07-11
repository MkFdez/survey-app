namespace dotnet_server.Models
{
    public class PostQuestion
    {
        public string q { get; set; }
        public ICollection<PostPossibleAnswers> pa { get; set; }
        public bool m { get; set; }
        public int t { get; set; }
    }
}
