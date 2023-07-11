using System.ComponentModel.DataAnnotations;

namespace dotnet_server.Models
{
    public class User
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string PasswordHash { get; set; }
        public string Picture { get; set; }
        public ICollection<Survey> Surveys { get; set; }
    }
}
