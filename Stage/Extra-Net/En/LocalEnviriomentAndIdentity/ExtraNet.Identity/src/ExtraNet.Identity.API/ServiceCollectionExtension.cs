using ExtraNet.Identity.Command;

namespace ExtraNet.Identity.API;

public static class ServiceCollectionExtension
{
	public static IServiceCollection ConfigureApiServices(
		this IServiceCollection services,
		IConfiguration configuration)
	{
		services.AddApiServices();

		services.AddCommandServices(configuration
			.GetSection("KeycloakClient"));

		return services;

	}

	public static IServiceCollection AddApiServices(
		this IServiceCollection services
		)
	{
		services.AddControllers();

		services.AddEndpointsApiExplorer();

		services.AddSwaggerGen();

		return services;
	}
}
