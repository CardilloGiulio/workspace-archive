using ExtraNet.Identity.Keycloak.Client.Keycloak;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.WebSockets;
using System.Text;

namespace ExtraNet.Identity.Keycloak.Client.User;

public class UserService(
	IHttpClientFactory httpClientFactory,
	IOptions<KeycloakClientOptions> options,
	ILogger<UserService> _logger) : IUserService
{
	private readonly HttpClient _httpClient = httpClientFactory.CreateClient("authenticatedKeycloakClient");

	public async Task<UserCreationResponse?> AddUserAsync(User user, CancellationToken cancellationToken)
	{
		string url = string.Format(options.Value.KeycloakAddUser.ToIndexed(), options.Value.RealmName);

		string serializedUser = JsonConvert.SerializeObject(user, Formatting.Indented);
		_logger.LogTrace("Request body:\n{serializedUser}", serializedUser);

		var content = new StringContent(serializedUser, Encoding.UTF8, "application/json");

		var response = await _httpClient.PostAsync(url, content, cancellationToken);

		_logger.LogTrace("Response:\n{response}", response.ToString());

		if (response.IsSuccessStatusCode)
		{
			var locationHeader = response.Headers.Location?.ToString();
			if (!string.IsNullOrEmpty(locationHeader))
			{
				var userId = locationHeader.Split('/').Last();
				return new UserCreationResponse { UserId = userId };
			}
		}
		return null;
	}

	public async Task<HttpResponseMessage> ChangeUserPasswordByIdAsync(Guid userId, string newPassword, CancellationToken cancellationToken)
	{
		string url = string.Format(options.Value.KeycloakChangeUserPasswordById.ToIndexed(), options.Value.RealmName, userId);

		var body = new
		{
			type = "password",
			temporary = false,
			value = newPassword
		};

		string serializedBody = JsonConvert.SerializeObject(body, Formatting.Indented);

		_logger.LogTrace("Request body:\n{serializedBody}", serializedBody);

		var content = new StringContent(serializedBody, Encoding.UTF8, "application/json");

		var response = await _httpClient.PutAsync(url, content, cancellationToken);

		_logger.LogTrace("Response:\n{response}", response.ToString());

		return response;
	}

	public async Task<HttpResponseMessage> DeleteUserByIdAsync(Guid id, CancellationToken cancellationToken)
	{
		string url = string.Format(options.Value.KeycloakDeleteUserById.ToIndexed(), options.Value.RealmName, id);

		_logger.LogTrace("Request URI: {url}", url);

		var response = await _httpClient.DeleteAsync(url, cancellationToken);

		_logger.LogTrace("Response:\n{response}", response.ToString());

		return response;
	}
}