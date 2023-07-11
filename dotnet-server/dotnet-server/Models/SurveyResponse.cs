using System.ComponentModel.DataAnnotations;

namespace dotnet_server.Models
{
    public class SurveyResponse
    {
        [Key]
        public string Id { get; set; }
        public Survey Survey { get; set; }
        public string Response { get; set; }
    }
}
