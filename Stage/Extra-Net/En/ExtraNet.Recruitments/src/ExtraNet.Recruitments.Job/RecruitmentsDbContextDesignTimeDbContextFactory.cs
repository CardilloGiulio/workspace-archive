using System.Reflection;
using ExtraNet.Recruitments.Persistence;
using ExtraNet.Recruitments.Persistence.Migrations;
using Microsoft.EntityFrameworkCore.Design;

namespace ExtraNet.Recruitments.Job;

public class RecruitmentsDbContextDesignTimeDbContextFactory : IDesignTimeDbContextFactory<RecruitmentsDbContext>
{
    public RecruitmentsDbContext CreateDbContext(string[] args)
    {
        return new RecruitmentsDbContext(new DatabaseOptions
        {
            ConnectionString = args.FirstOrDefault(),
            MigrationsAssembly = Assembly.GetAssembly(typeof(AssemblyInfo))
        });
    }
}
