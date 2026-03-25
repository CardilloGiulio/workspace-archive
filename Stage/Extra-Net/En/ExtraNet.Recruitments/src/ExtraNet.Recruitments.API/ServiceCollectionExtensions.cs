using ExtraNet.Recruitments.Command;
using ExtraNet.Recruitments.Domain;
using ExtraNet.Recruitments.Persistence;
using ExtraNet.Recruitments.Query;

namespace ExtraNet.Recruitments.API;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration configuration)
    {
		services.AddApis();

		services.AddDomainServices();
        services.AddQueryServices();
        services.AddCommandServices();
        services.AddPersistenceServices(configuration.GetSection("PostgresDatabase"));

		return services;
    }

	private static IServiceCollection AddApis(this IServiceCollection services)
	{
		services.AddControllers();
		services.AddEndpointsApiExplorer();
		services.AddSwaggerGen();

		return services;
	}
}
