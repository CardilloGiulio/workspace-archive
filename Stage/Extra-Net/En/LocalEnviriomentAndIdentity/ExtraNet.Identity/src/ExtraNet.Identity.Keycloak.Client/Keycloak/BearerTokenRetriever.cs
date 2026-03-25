using Microsoft.Extensions.Options;
using System.Text.Json;

namespace ExtraNet.Identity.Keycloak.Client.Keycloak;

public class BearerTokenRetriever(
	IHttpClientFactory httpClientFactory,
	IOptions<KeycloakClientOptions> keycloakClientOptions
) : IBearerTokenRetriever
{
	private readonly HttpClient _httpUnauthenticatedKeycloakClient = httpClientFactory.CreateClient("unauthenticatedKeycloakClient");
	private readonly KeycloakClientOptions _keycloakClientOptions = keycloakClientOptions.Value;

	public async Task<string?> GetJwtAsync(CancellationToken cancellationToken)
	{
		var formContent = new FormUrlEncodedContent(
			new Dictionary<string, string>
			{
				{ "client_id", _keycloakClientOptions.ClientId },
				{ "username", _keycloakClientOptions.Username },
				{ "password", _keycloakClientOptions.Password },
				{ "grant_type", "password" }
			}
		);

		var response = await _httpUnauthenticatedKeycloakClient
			.PostAsync(_keycloakClientOptions.KeycloakToken.ToIndexed(), formContent, cancellationToken);

		if (!response.IsSuccessStatusCode)
			return null;

		var json = await response.Content
			.ReadAsStringAsync(cancellationToken);

		using var doc = JsonDocument
			.Parse(json);

		return doc.RootElement
			.GetProperty("access_token").GetString();
	}
}
