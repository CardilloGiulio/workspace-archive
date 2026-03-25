using ExtraNet.Recruitments.Domain.HumanResources;
using ExtraNet.Recruitments.Domain.JobDescriptions;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace ExtraNet.Recruitments.Persistence;

public class RecruitmentsDbContext(DatabaseOptions databaseOptions) : DbContext(new DbContextOptionsBuilder<RecruitmentsDbContext>().Options)
{
	public DbSet<JobDescription> JobDescriptions { get; set; }
	public DbSet<HumanResource> HumanResources { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
        if (optionsBuilder.IsConfigured)
            return;

		if(databaseOptions.IsInMemory)
		{
			optionsBuilder.UseInMemoryDatabase(databaseOptions.DatabaseName.ToString());
		}
		else
		{
			optionsBuilder.UseNpgsql(
				databaseOptions.ConnectionString,
				options =>
				{
					if (databaseOptions.MigrationsAssembly != null)
						options.MigrationsAssembly(databaseOptions.MigrationsAssembly.GetName().Name);
				}
			);
		}

		if (databaseOptions.EnableDebug)
		{
			optionsBuilder.EnableDetailedErrors();
			optionsBuilder.EnableSensitiveDataLogging();
		}
	}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(RecruitmentsDbContext))!);
    }

}
