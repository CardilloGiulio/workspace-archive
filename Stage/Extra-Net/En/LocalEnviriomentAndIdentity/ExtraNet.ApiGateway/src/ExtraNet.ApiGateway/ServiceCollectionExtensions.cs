using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Ocelot.DependencyInjection;

namespace ExtraNet.ApiGateway;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddApiGatewayServices(
		this IServiceCollection services,
		IConfiguration configuration
	)
	{
		services
		  .AddMultiSchemaAuthentication<AuthenticationOptions, ConfigureJwtBearerOptions>(configuration
		  .GetSection("Authentication"));

		services
		  .AddEndpointsApiExplorer();

		services
		  .AddSwaggerForOcelot(configuration);

		services
		  .AddOcelot(configuration);

		services.AddCors(
			o =>
			{
				o.AddDefaultPolicy(
					c =>
					{
						c.AllowAnyOrigin();
						c.AllowAnyMethod();
						c.AllowAnyHeader();
					}
				);
			}
		);

		return services;
	}

	private static IServiceCollection AddMultiSchemaAuthentication<TOptions, TConfigureOptions>(
	  this IServiceCollection services,
	  IConfigurationSection authenticationConfiguration
	)
	  where TOptions : class
	  where TConfigureOptions : class, IConfigureNamedOptions<JwtBearerOptions>
	{
		var authenticationBuilder = services
		  .AddAuthentication();

		var authenticationSections = authenticationConfiguration
		  .GetChildren()
		  .AsEnumerable();

		foreach (var kv in authenticationSections)
		{
			services
			  .Configure<TOptions>(kv.Key, kv);

			authenticationBuilder
			  .AddJwtBearer(kv.Key);
		}

		services.ConfigureOptions<TConfigureOptions>();

		return services;
	}
}
