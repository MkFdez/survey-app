using Microsoft.EntityFrameworkCore;

namespace dotnet_server.Models;

public class AppDbContext: DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Survey> Surveys { get; set;}
    public DbSet<SurveyResponse> SurveysResponse { get;set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
       

    }
    }
