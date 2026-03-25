using ExtraNet.Identity.Keycloak.Client.Keycloak;
using ExtraNet.Identity.Keycloak.Client.Realm;
using System.Data;
using System.Reflection;
using System.Text.Json;

namespace ExtraNet.Identity.Job;

public class KeycloakImporterBackgroundService(
	IKeycloakClient _keycloakClient,
	IHostApplicationLifetime _hostApplicationLifetime
) : BackgroundService
{
	private string _realmDataAsString = null!;
	private RealmData _realmData = null!;
	private JsonDocument _realmDataAsJsonDocument = null!;

	private readonly JsonSerializerOptions _options = new()
	{
		PropertyNameCaseInsensitive = true
	};

	protected override async Task ExecuteAsync(CancellationToken stoppingToken)
	{
		_realmDataAsString = await ReadFileAsync("realm-export.json", stoppingToken);

		_realmData = JsonSerializer
			.Deserialize<RealmData>(
				_realmDataAsString,
				_options
			)
			??
			throw new ArgumentException();

		_realmDataAsJsonDocument = JsonSerializer.Deserialize<JsonDocument>(_realmDataAsString)
			??
			throw new ArgumentException();

		var realmNotAlreadyExisting = await _keycloakClient
			.ImportRealmAsync(_realmDataAsString, stoppingToken);

		if (!realmNotAlreadyExisting)
		{
			await _keycloakClient
				.PartialImportAsync(_realmDataAsJsonDocument.RootElement, stoppingToken);
		}

		await ManageRealmSettingsAsync(stoppingToken);

		await ManageClientsAsync(stoppingToken);

		await ManageRealmRolesAsync(stoppingToken);

		await ManageGroupsAsync(stoppingToken);

		await ManageClientScopesAsync(stoppingToken);

		_hostApplicationLifetime.StopApplication();
	}

	private async Task ManageRealmSettingsAsync(CancellationToken cancellationToken)
	{
		var realmSettingsRepresentation = _realmDataAsJsonDocument.RootElement.GetRawText();

		try
		{
			var existingSettings = await _keycloakClient.GetRealmSettingsAsync(cancellationToken);

			if (existingSettings != null)
			{
				await _keycloakClient.UpdateRealmSettingsAsync(realmSettingsRepresentation, cancellationToken);
			}
			else
			{
				await _keycloakClient.AddRealmSettingsAsync(realmSettingsRepresentation, cancellationToken);
			}
		}
		catch (HttpRequestException ex)
		{
			Console.WriteLine($"Errore durante il recupero delle impostazioni del realm: {ex.Message}");
			await _keycloakClient.AddRealmSettingsAsync(realmSettingsRepresentation, cancellationToken);
		}
	}

	private async Task ManageClientsAsync(CancellationToken cancellationToken)
	{
		var existingClients = await _keycloakClient
			.GetClientsAsync(cancellationToken);

		var clientNamesToKeep = _realmData.Clients
			.Select(c => c.Name)
			.ToList();

		foreach (
			var clientName in existingClients
			  .Select(c => c.Name)
			  .Except(clientNamesToKeep)
		)
		{
			await _keycloakClient
				.DeleteClientAsync(existingClients.First(c => c.Name == clientName).Id, cancellationToken);
		}

		foreach (var client in _realmData.Clients)
		{
			var previousClient = existingClients.FirstOrDefault(r => r.Name == client.Name);

			var clientRepresentation = GetRepresentation(_realmDataAsJsonDocument.RootElement, "clients", client.Id);

			if (previousClient == null)
			{
				await _keycloakClient
					.AddClientAsync(clientRepresentation.ToString(), cancellationToken);
			}
			else
			{
				await _keycloakClient
					.UpdateClientAsync(previousClient.Id, clientRepresentation.SetId(previousClient.Id).ToString(), cancellationToken);
			}

			var clientId = previousClient?.Id ?? client.Id;

			var existingClientRoles = await _keycloakClient
				.GetClientRolesAsync(clientId, cancellationToken);

			var clientRoleNamesToKeep = _realmData.Roles
				.Client[client.ClientId]
				.Select(kvp => kvp.Name)
				.ToList();

			foreach (
				var clientRoleName in existingClientRoles
					.Select(r => r.Name)
					.Except(clientRoleNamesToKeep)
			)
			{
				await _keycloakClient
					.DeleteClientRoleAsync(clientId, clientRoleName, cancellationToken);
			}

			foreach (var clientRole in _realmData.Roles.Client[client.ClientId])
			{
				try
				{
					var roleRepresentation = GetRepresentation(_realmDataAsJsonDocument.RootElement, $"roles:client:{client.ClientId}", clientRole.Id);

					if (!existingClientRoles.Any(r => r.Name == clientRole.Name))
					{
						await _keycloakClient
							.AddClientRoleAsync(clientId, roleRepresentation.ToString(), cancellationToken);
					}
					else
					{
						await _keycloakClient
							.UpdateClientRoleAsync(clientId, clientRole.Name, roleRepresentation.ToString(), cancellationToken);
					}
				}
				catch
				{
					// TODO: ILogger
					Console.WriteLine($"{client.ClientId} has no client roles");
				}
			}
		}
	}

	private async Task ManageGroupsAsync(CancellationToken cancellationToken)
	{
		var existingGroups = await _keycloakClient
			.GetGroupsAsync(cancellationToken);

		var groupNamesToKeep = _realmData.Groups
			.Select(g => g.Name)
			.ToList();

		foreach (
			var groupName in existingGroups
			.Select(g => g.Name)
			.Except(groupNamesToKeep)
		)
		{
			await _keycloakClient
				.DeleteGroupAsync(existingGroups.First(c => c.Name == groupName).Id, cancellationToken);
		}

		foreach (var group in _realmData.Groups)
		{
			var previousGroup = existingGroups.FirstOrDefault(r => r.Name == group.Name);

			var groupRepresentation = GetRepresentation(_realmDataAsJsonDocument.RootElement, "groups", group.Id);

			using var jsonDocument = JsonDocument.Parse(groupRepresentation.ToString());
			var jsonObject = jsonDocument.RootElement.Clone();
			var jsonObjectString = jsonObject.GetRawText();

			var targetGroupId = previousGroup?.Id.ToString();

			if (previousGroup == null)
			{
				var jsonObjectWithoutId = JsonSerializer.Deserialize<JsonElement>(jsonObjectString);
				var jsonObjectDictionary = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonObjectWithoutId.GetRawText());

				jsonObjectDictionary?.Remove("id");

				var jsonStringWithoutId = JsonSerializer.Serialize(jsonObjectDictionary);

				await _keycloakClient.AddGroupAsync(jsonStringWithoutId, cancellationToken);

				var groups = await _keycloakClient.GetGroupsAsync(cancellationToken);

				var targetGroup = groups.FirstOrDefault(g => g.Name == group.Name);
				targetGroupId = targetGroup?.Id.ToString();
			}
			else
			{
				await _keycloakClient.UpdateGroupAsync(previousGroup.Id, jsonObjectString, cancellationToken);
			}

			if (targetGroupId != null)
			{
				var realmRoles = await _keycloakClient.GetRealmRolesAsync(cancellationToken);
				var existingGroupRoles = await _keycloakClient.GetRealmRolesOfGroup(targetGroupId, cancellationToken);

				foreach (var realmRole in group.RealmRoles)
				{
					var role = realmRoles.FirstOrDefault(r => r.Name == realmRole);
					if (role != null)
					{
						if (!existingGroupRoles.Any(r => r.Name == realmRole))
						{
							var roleJsonArray = JsonSerializer.Serialize(new[]
							{
						new { id = role.Id, name = role.Name }
					});

							await _keycloakClient.AssignRealmRoleToGroup(targetGroupId, roleJsonArray, cancellationToken);
						}
					}
				}

				foreach (var existingRole in existingGroupRoles)
				{
					if (!group.RealmRoles.Contains(existingRole.Name))
					{
						var roleJsonArray = JsonSerializer.Serialize(new[]
						{
					new { id = existingRole.Id, name = existingRole.Name }
				});

						await _keycloakClient.UnassignRealmRoleToGroup(targetGroupId, roleJsonArray, cancellationToken);
					}
				}
			}
		}
	}

	private async Task ManageRealmRolesAsync(CancellationToken cancellationToken)
	{
		var existingRealmRoles = await _keycloakClient
			.GetRealmRolesAsync(cancellationToken);

		var realmRoleNamesToKeep = _realmData.Roles.Realm
			.Select(r => r.Name)
			.ToList();

		foreach (
			var roleName in existingRealmRoles
				.Select(r => r.Name)
				.Except(realmRoleNamesToKeep)
		)
		{
			await _keycloakClient
				.DeleteRealmRoleAsync(existingRealmRoles.First(r => r.Name == roleName).Id, cancellationToken);
		}

		foreach (var realmRole in _realmData.Roles.Realm)
		{
			var previousRealmRole = existingRealmRoles.FirstOrDefault(r => r.Name == realmRole.Name);

			var realmRoleRepresentation = GetRepresentation(_realmDataAsJsonDocument.RootElement, "roles:realm", realmRole.Id);

			if (previousRealmRole == null)
			{
				await _keycloakClient
					.AddRealmRoleAsync(realmRoleRepresentation.ToString(), cancellationToken);
			}
			else
			{
				await _keycloakClient
					.UpdateRealmRoleAsync(previousRealmRole.Id, realmRoleRepresentation.SetId(previousRealmRole.Id).ToString(), cancellationToken);
			}
		}
	}

	private async Task ManageClientScopesAsync(CancellationToken cancellationToken)
	{
		var existingClientScopes = await _keycloakClient
			.GetClientScopesAsync(cancellationToken);

		var clientScopeNamesToKeep = _realmData.ClientScopes
			.Select(cs => cs.Name)
			.ToList();

		foreach (
			var clientScopeName in existingClientScopes
				.Select(cs => cs.Name)
				.Except(clientScopeNamesToKeep)
		)
		{
			await _keycloakClient
				.DeleteClientScopeAsync(existingClientScopes.First(r => r.Name == clientScopeName).Id, cancellationToken);
		}

		foreach (var clientScope in _realmData.ClientScopes)
		{
			var previousClientScope = existingClientScopes.FirstOrDefault(r => r.Name == clientScope.Name);

			var clientScopeRepresentation = GetRepresentation(_realmDataAsJsonDocument.RootElement, "clientScopes", clientScope.Id);

			if (previousClientScope == null)
			{
				await _keycloakClient
					.AddClientScopeAsync(clientScopeRepresentation.ToString(), cancellationToken);
			}
			else
			{
				await _keycloakClient
					.UpdateClientScopeAsync(previousClientScope.Id, clientScopeRepresentation.SetId(previousClientScope.Id).ToString(), cancellationToken);
			}

			if (clientScope.ProtocolMappers != null)
			{
				var clientScopeId = previousClientScope?.Id ?? clientScope.Id;

				var existingProtocolMappers = await _keycloakClient
					.GetProtocolMappersAsync(clientScopeId, cancellationToken);

				var protocolMapperNamesToKeep = clientScope.ProtocolMappers
					.Select(m => m.Name)
					.ToList();

				foreach (
					var protocolMapperName in existingProtocolMappers
						.Select(m => m.Name)
						.Except(protocolMapperNamesToKeep)
				)
				{
					await _keycloakClient
						.DeleteProtocolMapperAsync(existingProtocolMappers.First(r => r.Name == protocolMapperName).Id, clientScopeId, cancellationToken);
				}

				foreach (var mapper in clientScope.ProtocolMappers)
				{
					var previousProtocolMapper = existingProtocolMappers.FirstOrDefault(r => r.Name == mapper.Name);

					var protocolMapperRepresentation = GetRepresentation(clientScopeRepresentation, "protocolMappers", mapper.Id);

					if (previousProtocolMapper == null)
					{
						await _keycloakClient
							.AddProtocolMapperAsync(protocolMapperRepresentation.ToString(), clientScopeId, cancellationToken);
					}
					else
					{
						await _keycloakClient
							.UpdateProtocolMapperAsync(previousProtocolMapper.Id, protocolMapperRepresentation.SetId(previousProtocolMapper.Id).ToString(), clientScopeId, cancellationToken);
					}
				}
			}
		}
	}

	private static JsonElement GetRepresentation(JsonElement jsonElement, string propertyName, Guid id)
	{
		var propertyNames = propertyName.Split(':');

		var propertyAsJsonElement = jsonElement;

		foreach (var p in propertyNames)
		{
			propertyAsJsonElement = propertyAsJsonElement.GetProperty(p);
		}

		return propertyAsJsonElement
			.EnumerateArray()
			.First(
				jsonElement => jsonElement
					.GetProperty("id")
					.GetGuid() == id
			);
	}

	private static Task<string> ReadFileAsync(string filePath, CancellationToken cancellationToken)
	{
		var assembly = Assembly
			.GetExecutingAssembly();

		using var stream = assembly
			.GetManifestResourceStream($"{assembly.GetName().Name}.{filePath.Replace("/", ".")}")!;

		using var reader = new StreamReader(stream);

		return reader
			.ReadToEndAsync(cancellationToken);
	}
}