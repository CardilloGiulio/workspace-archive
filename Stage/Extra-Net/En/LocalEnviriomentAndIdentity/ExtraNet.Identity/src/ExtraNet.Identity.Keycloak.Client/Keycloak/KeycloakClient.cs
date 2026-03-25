using ExtraNet.Identity.Keycloak.Client.Realm;
using Microsoft.Extensions.Options;
using System.Text;
using System.Text.Json;

namespace ExtraNet.Identity.Keycloak.Client.Keycloak;

public class KeycloakClient(IHttpClientFactory httpClientFactory, IOptions<KeycloakClientOptions> options) : IKeycloakClient
{
	private readonly HttpClient _httpClient = httpClientFactory.CreateClient("authenticatedKeycloakClient");
	private readonly KeycloakClientOptions _keycloakClientOptions = options.Value;

	public async Task<bool> ImportRealmAsync(string realmData, CancellationToken cancellationToken)
	{
		return await PostAsync(string.Format(_keycloakClientOptions.KeycloakCreateRealm.ToIndexed()), realmData, cancellationToken);
	}

	public async Task<bool> PartialImportAsync(JsonElement realmData, CancellationToken cancellationToken)
	{
		var content = JsonSerializer.Serialize(
			new Dictionary<string, object?>
			{
				{ "id", realmData.GetProperty("id") },
				{ "ifResourceExists", "SKIP" },
				{ "clients", realmData.GetProperty("clients") },
				{ "realm", realmData.GetProperty("realm") },
				{ "roles", realmData.GetProperty("roles") }
			}
		);

		var url = string
			.Format(_keycloakClientOptions.KeycloakImportRealm.ToIndexed(), _keycloakClientOptions.RealmName);

		return await PostAsync(url, content, cancellationToken);
	}

	public async Task<bool> AddClientAsync(string clientRepresentation, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakCreateClient.ToIndexed(), _keycloakClientOptions.RealmName);

		return await PostAsync(url, clientRepresentation, cancellationToken);
	}

	public async Task<List<Realm.Client>> GetClientsAsync(CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakGetClient.ToIndexed(), _keycloakClientOptions.RealmName);

		HttpResponseMessage response = await _httpClient
		  .GetAsync(url, cancellationToken);

		if (response.IsSuccessStatusCode)
		{
			string content = await response.Content
			  .ReadAsStringAsync(cancellationToken);

			var clients = JsonSerializer
			  .Deserialize<List<Realm.Client>>(content, new JsonSerializerOptions
			  {
				  PropertyNameCaseInsensitive = true
			  });

			return clients ?? [];
		}
		else
		{
			return [];
		}
	}

	public async Task<bool> UpdateClientAsync(Guid clientId, string clientRepresentation, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakUpdateClient.ToIndexed(), _keycloakClientOptions.RealmName, clientId);

		return await PutAsync(url, clientRepresentation, cancellationToken);
	}

	public async Task<bool> DeleteClientAsync(Guid clientId, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakDeleteClient.ToIndexed(), _keycloakClientOptions.RealmName, clientId);

		return await DeleteAsync(url, cancellationToken);
	}

	public async Task<bool> AddGroupAsync(string groupRepresentation, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakCreateGroup.ToIndexed(), _keycloakClientOptions.RealmName);

		return await PostAsync(url, groupRepresentation, cancellationToken);
	}

	public async Task<List<Group>> GetGroupsAsync(CancellationToken cancellationToken)
	{
		var url = string.Format(_keycloakClientOptions.KeycloakGetGroup.ToIndexed(), _keycloakClientOptions.RealmName);

		HttpResponseMessage response = await _httpClient.GetAsync(url, cancellationToken);

		if (response.IsSuccessStatusCode)
		{
			string content = await response.Content.ReadAsStringAsync(cancellationToken);

			var groups = JsonSerializer.Deserialize<List<Group>>(content, new JsonSerializerOptions
			{
				PropertyNameCaseInsensitive = true
			});

			return groups ?? [];
		}
		else
		{
			return [];
		}
	}

	public async Task<bool> UpdateGroupAsync(Guid groupId, string groupRepresentation, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakUpdateGroup.ToIndexed(), _keycloakClientOptions.RealmName, groupId);

		return await PutAsync(url, groupRepresentation, cancellationToken);
	}

	public async Task<bool> DeleteGroupAsync(Guid groupId, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakDeleteGroup.ToIndexed(), _keycloakClientOptions.RealmName, groupId);

		return await DeleteAsync(url, cancellationToken);
	}

	public async Task<bool> AddRealmRoleAsync(string roleRepresentation, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakCreateRealmRole.ToIndexed(), _keycloakClientOptions.RealmName);

		return await PostAsync(url, roleRepresentation, cancellationToken);
	}

	public async Task<List<Role>> GetRealmRolesAsync(CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakGetRealmRole.ToIndexed(), _keycloakClientOptions.RealmName);

		HttpResponseMessage response = await _httpClient
		  .GetAsync(url, cancellationToken);

		if (response.IsSuccessStatusCode)
		{
			string content = await response.Content
			  .ReadAsStringAsync(cancellationToken);

			var role = JsonSerializer
			  .Deserialize<List<Role>>(content, new JsonSerializerOptions
			  {
				  PropertyNameCaseInsensitive = true
			  });
			return role ?? [];
		}
		else
		{
			return [];
		}
	}

	public async Task<bool> UpdateRealmRoleAsync(Guid roleId, string roleRepresentation, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakUpdateRealmRole.ToIndexed(), _keycloakClientOptions.RealmName, roleId);

		return await PutAsync(url, roleRepresentation, cancellationToken);
	}

	public async Task<bool> DeleteRealmRoleAsync(Guid roleId, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakDeleteRealmRole.ToIndexed(), _keycloakClientOptions.RealmName, roleId);

		return await DeleteAsync(url, cancellationToken);
	}

	public async Task<bool> AddClientRoleAsync(Guid clientId, string roleRepresentation, CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakCreateClientRole.ToIndexed(), _keycloakClientOptions.RealmName, clientId);

		return await PostAsync(url, roleRepresentation, cancellationToken);
	}

	public async Task<List<Role>> GetClientRolesAsync(Guid clientId, CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakGetClientRole.ToIndexed(), _keycloakClientOptions.RealmName, clientId);

		HttpResponseMessage response = await _httpClient
		  .GetAsync(url, cancellationToken);

		if (response.IsSuccessStatusCode)
		{
			string content = await response.Content
			  .ReadAsStringAsync(cancellationToken);

			var role = JsonSerializer
			  .Deserialize<List<Role>>(content, new JsonSerializerOptions
			  {
				  PropertyNameCaseInsensitive = true
			  });
			return role ?? [];
		}
		else
		{
			return [];
		}
	}

	public async Task<bool> UpdateClientRoleAsync(Guid clientId, string clientRoleName, string roleRepresentation, CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakUpdateRealmRole.ToIndexed(), _keycloakClientOptions.RealmName, clientId, clientRoleName);

		return await PutAsync(url, roleRepresentation, cancellationToken);
	}

	public async Task<bool> DeleteClientRoleAsync(Guid clientId, string clientRoleName, CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakDeleteClientRole.ToIndexed(), _keycloakClientOptions.RealmName, clientId, clientRoleName);

		return await DeleteAsync(url, cancellationToken);
	}

	public async Task<bool> AddClientScopeAsync(string clientScopeRepresentation, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakCreateClientScope.ToIndexed(), _keycloakClientOptions.RealmName);

		return await PostAsync(url, clientScopeRepresentation, cancellationToken);
	}

	public async Task<List<ClientScope>> GetClientScopesAsync(CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakGetClientScope.ToIndexed(), _keycloakClientOptions.RealmName);

		HttpResponseMessage response = await _httpClient
		  .GetAsync(url, cancellationToken);

		if (response.IsSuccessStatusCode)
		{
			string content = await response.Content
			  .ReadAsStringAsync(cancellationToken);

			var clientScope = JsonSerializer
			  .Deserialize<List<ClientScope>>(content, new JsonSerializerOptions
			  {
				  PropertyNameCaseInsensitive = true
			  });
			return clientScope ?? [];
		}
		else
		{

			throw new HttpRequestException($"Error fetching clients: {response.StatusCode}");
		}
	}

	public async Task<bool> UpdateClientScopeAsync(Guid clientScopeId, string clientScopeRepresentation, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakUpdateClientScope.ToIndexed(), _keycloakClientOptions.RealmName, clientScopeId);

		return await PutAsync(url, clientScopeRepresentation, cancellationToken);
	}

	public async Task<bool> DeleteClientScopeAsync(Guid clientScopeId, CancellationToken cancellationToken)
	{
		var url = string
			.Format(_keycloakClientOptions.KeycloakDeleteClientScope.ToIndexed(), _keycloakClientOptions.RealmName, clientScopeId);

		return await DeleteAsync(url, cancellationToken);
	}

	public async Task<bool> AddProtocolMapperAsync(string protocolMapperRepresentation, Guid clientScopeId, CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakCreateProtocolMapper.ToIndexed(), _keycloakClientOptions.RealmName, clientScopeId);

		return await PostAsync(url, protocolMapperRepresentation, cancellationToken);
	}

	public async Task<List<ProtocolMapper>> GetProtocolMappersAsync(Guid clientScopeId, CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakGetProtocolMapper.ToIndexed(), _keycloakClientOptions.RealmName, clientScopeId);

		HttpResponseMessage response = await _httpClient
		  .GetAsync(url, cancellationToken);

		if (response.IsSuccessStatusCode)
		{
			string content = await response.Content
			  .ReadAsStringAsync(cancellationToken);

			var protocolMappers = JsonSerializer
			  .Deserialize<List<ProtocolMapper>>(content, new JsonSerializerOptions
			  {
				  PropertyNameCaseInsensitive = true
			  });
			return protocolMappers ?? [];
		}
		else
		{
			return [];
		}
	}

	public async Task<bool> UpdateProtocolMapperAsync(Guid protocolMapperId, string protocolMapperRepresentation, Guid clientScopeId, CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakUpdateProtocolMapper.ToIndexed(), _keycloakClientOptions.RealmName, clientScopeId, protocolMapperId);

		return await PutAsync(url, protocolMapperRepresentation, cancellationToken);
	}

	public async Task<bool> DeleteProtocolMapperAsync(Guid protocolMapperId, Guid clientScopeId, CancellationToken cancellationToken)
	{
		var url = string
		  .Format(_keycloakClientOptions.KeycloakDeleteProtocolMapper.ToIndexed(), _keycloakClientOptions.RealmName, clientScopeId, protocolMapperId);

		return await DeleteAsync(url, cancellationToken);
	}

	public async Task<bool> AddRealmSettingsAsync(string realmSettingsRepresentation, CancellationToken cancellationToken)
	{
		var url = string.Format(_keycloakClientOptions.KeycloakCreateRealmSettings.ToIndexed(), _keycloakClientOptions.RealmName);
		return await PostAsync(url, realmSettingsRepresentation, cancellationToken);
	}

	public async Task<RealmSettings> GetRealmSettingsAsync(CancellationToken cancellationToken)
	{
		var url = string.Format(_keycloakClientOptions.KeycloakGetRealmSettings.ToIndexed(), _keycloakClientOptions.RealmName);
		HttpResponseMessage response = await _httpClient.GetAsync(url, cancellationToken);

		if (response.IsSuccessStatusCode)
		{
			string content = await response.Content.ReadAsStringAsync(cancellationToken);
			var settings = JsonSerializer.Deserialize<RealmSettings>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
			return settings ?? new RealmSettings();
		}
		else
		{
			throw new HttpRequestException($"Error fetching realm settings: {response.StatusCode}");
		}
	}

	public async Task<bool> UpdateRealmSettingsAsync(string realmSettingsRepresentation, CancellationToken cancellationToken)
	{
		var url = string.Format(_keycloakClientOptions.KeycloakPutRealmSettings.ToIndexed(), _keycloakClientOptions.RealmName);
		return await PutAsync(url, realmSettingsRepresentation, cancellationToken);
	}

	public async Task<bool> DeleteRealmSettingsAsync(CancellationToken cancellationToken)
	{
		var url = string.Format(_keycloakClientOptions.KeycloakDeleteRealmSettings.ToIndexed(), _keycloakClientOptions.RealmName);
		return await DeleteAsync(url, cancellationToken);
	}

	public async Task<bool> AssignRealmRoleToGroup(string groupId, string roleRepresentation, CancellationToken cancellationToken)
	{
		var url = string.Format(_keycloakClientOptions.KeycloakAssignRealmRoleToGroup.ToIndexed(), _keycloakClientOptions.RealmName, groupId);
		return await PostAsync(url, roleRepresentation, cancellationToken);
	}

	public async Task<bool> UnassignRealmRoleToGroup(string groupId, string roleRepresentation, CancellationToken cancellationToken)
	{
		var url = string.Format(_keycloakClientOptions.KeycloakUnassignRealmRoleToGroup.ToIndexed(), _keycloakClientOptions.RealmName, groupId);
		return await DeleteWithBodyAsync(url, roleRepresentation, cancellationToken);
	}

	public async Task<List<Role>> GetRealmRolesOfGroup(string groupId, CancellationToken cancellationToken)
	{
		var url = string.Format(_keycloakClientOptions.KeycloakGetRealmRolesOfGroup.ToIndexed(), _keycloakClientOptions.RealmName, groupId);
		HttpResponseMessage response = await _httpClient.GetAsync(url, cancellationToken);

		if (response.IsSuccessStatusCode)
		{
			string content = await response.Content.ReadAsStringAsync(cancellationToken);
			var roles = JsonSerializer.Deserialize<List<Role>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
			return roles ?? [];
		}
		else
		{
			throw new HttpRequestException($"Error fetching realm roles of group: {response.StatusCode}");
		}
	}

	private async Task<bool> DeleteWithBodyAsync(string url, string content, CancellationToken cancellationToken)
	{
		var baseUrl = $"{_keycloakClientOptions.KeycloakBaseUrl.TrimEnd('/')}/{_keycloakClientOptions.UriScheme}";
		var requestUrl = new Uri($"{baseUrl}/{url}");

		var request = new HttpRequestMessage
		{
			Method = HttpMethod.Delete,
			RequestUri = requestUrl,
			Content = new StringContent(content, Encoding.UTF8, "application/json")
		};

		var response = await _httpClient.SendAsync(request, cancellationToken);
		return await ProcessResponse(url, content, response);
	}

	private async Task<bool> PostAsync(string url, string content, CancellationToken cancellationToken)
	{
		var stringContent = new StringContent(content, Encoding.UTF8, "application/json");

		var response = await _httpClient
		  .PostAsync(url, stringContent, cancellationToken);

		return await ProcessResponse(url, content, response);
	}

	private async Task<bool> PutAsync(string url, string content, CancellationToken cancellationToken)
	{
		var stringContent = new StringContent(content, Encoding.UTF8, "application/json");

		var response = await _httpClient
		  .PutAsync(url, stringContent, cancellationToken);

		return await ProcessResponse(url, content, response);
	}

	private async Task<bool> DeleteAsync(string url, CancellationToken cancellationToken)
	{
		var response = await _httpClient
		  .DeleteAsync(url, cancellationToken);

		return await ProcessResponse(url, string.Empty, response);
	}

	private static async Task<bool> ProcessResponse(string url, string content, HttpResponseMessage response)
	{
		if (response.IsSuccessStatusCode)
			return true;

		var errorContent = await response.Content
			.ReadAsStringAsync();

		Console.WriteLine($"HTTP Request failed: Url {url}, Content {content}, StatusCode {response.StatusCode}, ErrorContent {errorContent}");

		return false;
	}
}