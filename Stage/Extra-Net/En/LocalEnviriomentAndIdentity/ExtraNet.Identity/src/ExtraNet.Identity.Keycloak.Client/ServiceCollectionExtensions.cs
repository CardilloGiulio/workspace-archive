using ExtraNet.Identity.Keycloak.Client.Keycloak;
using ExtraNet.Identity.Keycloak.Client.User;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace ExtraNet.Identity.Keycloak.Client;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddKeycloakClientServices(
	  this IServiceCollection services,
	  IConfigurationSection configurationSection
	)
	{
		services
			.AddOptions<KeycloakClientOptions>()
			.Bind(configurationSection);

		services
			.AddTransient<IKeycloakClient, KeycloakClient>();

		services
			.AddTransient<IBearerTokenRetriever, BearerTokenRetriever>();

		services
			.AddTransient<AuthenticationDelegatingHandler>();

		services
			.AddScoped<IUserService, UserService>();

		services
			.AddHttpClient("authenticatedKeycloakClient")
			.ConfigureHttpClient(ConfigureAuthenticatedKeycloakClient())
			.AddHttpMessageHandler<AuthenticationDelegatingHandler>();

		services
			.AddHttpClient("unauthenticatedKeycloakClient")
			.ConfigureHttpClient(ConfigureUnauthenticatedKeycloakClient());

		return services;

		static Action<IServiceProvider, HttpClient> ConfigureUnauthenticatedKeycloakClient()
		{
			return (serviceProvider, httpClient) =>
			{
				var keycloakClientOptions = serviceProvider
					.GetRequiredService<IOptions<KeycloakClientOptions>>();

				httpClient.BaseAddress = new Uri(keycloakClientOptions.Value.KeycloakBaseUrl.Trim('/') + "/");
			};
		}

		static Action<IServiceProvider, HttpClient> ConfigureAuthenticatedKeycloakClient()
		{
			return (serviceProvider, httpClient) =>
			{
				var keycloakClientOptions = serviceProvider
					.GetRequiredService<IOptions<KeycloakClientOptions>>();

				httpClient.BaseAddress = new Uri($"{keycloakClientOptions.Value.KeycloakBaseUrl.Trim('/')}{keycloakClientOptions.Value.UriScheme}");
			};
		}
	}
}