using System.ComponentModel.DataAnnotations;

namespace dotnet_server.Models;

public class Question
{
    [Key]
    public string Id { get; set; }
    public string Q { get; set; }
    public ICollection<PossibleAnswer> Pa { get; set; }
    public bool M { get; set; }
    public int T { get; set; }
    public Survey Survey { get; set; }
}
