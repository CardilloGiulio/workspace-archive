using System.Text.Json;
using ExtraNet.Identity.Keycloak.Client.Realm;

namespace ExtraNet.Identity.Keycloak.Client.Keycloak;

public interface IKeycloakClient
{
	Task<bool> ImportRealmAsync(string realmData, CancellationToken cancellationToken);
	Task<bool> PartialImportAsync(JsonElement realmData, CancellationToken cancellationToken);

	Task<bool> AddClientAsync(string clientRepresentation, CancellationToken cancellationToken);
	Task<List<Realm.Client>> GetClientsAsync(CancellationToken cancellationToken);
	Task<bool> UpdateClientAsync(Guid clientId, string clientRepresentation, CancellationToken cancellationToken);
	Task<bool> DeleteClientAsync(Guid clientId, CancellationToken cancellationToken);

	Task<bool> AddGroupAsync(string groupRepresentation, CancellationToken cancellationToken);
	Task<List<Group>> GetGroupsAsync(CancellationToken cancellationToken);
	Task<bool> UpdateGroupAsync(Guid groupId, string groupRepresentation, CancellationToken cancellationToken);
	Task<bool> DeleteGroupAsync(Guid groupId, CancellationToken cancellationToken);

	Task<bool> AddRealmRoleAsync(string roleRepresentation, CancellationToken cancellationToken);
	Task<List<Role>> GetRealmRolesAsync(CancellationToken cancellationToken);
	Task<bool> UpdateRealmRoleAsync(Guid roleId, string groupRepresentation, CancellationToken cancellationToken);
	Task<bool> DeleteRealmRoleAsync(Guid roleId, CancellationToken cancellationToken);

	Task<bool> AddClientRoleAsync(Guid clientId, string roleRepresentation, CancellationToken cancellationToken);
	Task<List<Role>> GetClientRolesAsync(Guid clientId, CancellationToken cancellationToken);
	Task<bool> UpdateClientRoleAsync(Guid clientId, string clientRoleName, string roleRepresentation, CancellationToken cancellationToken);
	Task<bool> DeleteClientRoleAsync(Guid clientId, string clientRoleName, CancellationToken cancellationToken);

	Task<bool> AddClientScopeAsync(string clientScopeRepresentation, CancellationToken cancellationToken);
	Task<List<ClientScope>> GetClientScopesAsync(CancellationToken cancellationToken);
	Task<bool> UpdateClientScopeAsync(Guid clientScopeId, string clientScopeRepresentation, CancellationToken cancellationToken);
	Task<bool> DeleteClientScopeAsync(Guid clientScopeId, CancellationToken cancellationToken);

	Task<bool> AddProtocolMapperAsync(string protocolMapperRepresentation, Guid clientScopeId, CancellationToken cancellationToken);
	Task<List<ProtocolMapper>> GetProtocolMappersAsync(Guid clientScopeId, CancellationToken cancellationToken);
	Task<bool> UpdateProtocolMapperAsync(Guid protocolMapperId, string protocolMapperRepresentation, Guid clientScopeId, CancellationToken cancellationToken);
	Task<bool> DeleteProtocolMapperAsync(Guid protocolMapperId, Guid clientScopeId, CancellationToken cancellationToken);

	Task<bool> AddRealmSettingsAsync(string realmSettingsRepresentation, CancellationToken cancellationToken);
	Task<RealmSettings> GetRealmSettingsAsync(CancellationToken cancellationToken);
	Task<bool> UpdateRealmSettingsAsync(string realmSettingsRepresentation, CancellationToken cancellationToken);
	Task<bool> DeleteRealmSettingsAsync(CancellationToken cancellationToken);

	Task<bool> AssignRealmRoleToGroup(string groupId, string roleRepresentation, CancellationToken cancellationToken);
	Task<bool> UnassignRealmRoleToGroup(string groupId, string roleRepresentation, CancellationToken cancellationToken);
	Task<List<Role>> GetRealmRolesOfGroup(string groupId, CancellationToken cancellationToken);
}
