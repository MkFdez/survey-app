using System.ComponentModel.DataAnnotations;

namespace dotnet_server.Models
{
    public class PossibleAnswer
    {
        [Key]
        public string Id { get; set; }
        public Question Question { get; set; }
        public string A { get; set; }
        public int T { get; set; }  
    }
}
