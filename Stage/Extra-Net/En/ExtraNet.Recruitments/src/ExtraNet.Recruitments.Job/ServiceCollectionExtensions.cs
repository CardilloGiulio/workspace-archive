using System.Reflection;
using ExtraNet.Recruitments.Persistence;
using ExtraNet.Recruitments.Persistence.Migrations;

namespace ExtraNet.Recruitments.Job;

public static class ServiceCollectionExtensions 
{
    public static IServiceCollection ConfigureJobServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddJobServices();

        services.AddPersistenceServices(configuration.GetSection("PostgresDatabase"), Assembly.GetAssembly(typeof(AssemblyInfo))!);
        
        return services;
    }

    public static IServiceCollection AddJobServices(this IServiceCollection services)
    {
        services.AddHostedService<ApplyMigrationsBackgroundService>();
        
        return services;
    }
}
