using ExtraNet.Identity.Keycloak.Client;

namespace ExtraNet.Identity.Job;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddJobServices(
		this IServiceCollection services,
		IConfiguration configuration
	)
	{
		services
			.AddHostedService<KeycloakImporterBackgroundService>();

		services
			.AddKeycloakClientServices(
				configuration
					.GetSection("KeycloakClient")
			);

		return services;
	}
}
