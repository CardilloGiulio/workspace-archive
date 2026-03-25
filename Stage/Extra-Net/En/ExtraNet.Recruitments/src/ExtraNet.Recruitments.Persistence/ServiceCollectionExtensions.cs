using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace ExtraNet.Recruitments.Persistence;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddPersistenceServices(
		this IServiceCollection services,
		IConfigurationSection postgresDbConfigurationSection,
		Assembly? migrationsAssembly = null
	)
	{
		services.AddDbContext<RecruitmentsDbContext>();

		services
			.AddOptions<DatabaseOptions>()
			.Bind(postgresDbConfigurationSection)
			.Configure(x => x.MigrationsAssembly = migrationsAssembly);

		services
			.AddScoped(x => x.GetRequiredService<IOptions<DatabaseOptions>>().Value);

        return services;
	}
}