namespace ExtraNet.Identity.Keycloak.Client.Keycloak;

public class KeycloakClientOptions
{
	public required string RealmName { get; set; }

	public required string KeycloakBaseUrl { get; set; }
	public required string UriScheme { get; set; }

	public required string ClientId { get; set; }
	public required string Username { get; set; }
	public required string Password { get; set; }

	public required string KeycloakCreateRealm { get; set; }
	public required string KeycloakImportRealm { get; set; }

	public required string KeycloakCreateClient { get; set; }
	public required string KeycloakGetClient { get; set; }
	public required string KeycloakUpdateClient { get; set; }
	public required string KeycloakDeleteClient { get; set; }

	public required string KeycloakCreateGroup { get; set; }
	public required string KeycloakGetGroup { get; set; }
	public required string KeycloakUpdateGroup { get; set; }
	public required string KeycloakDeleteGroup { get; set; }

	public required string KeycloakCreateRealmRole { get; set; }
	public required string KeycloakGetRealmRole { get; set; }
	public required string KeycloakUpdateRealmRole { get; set; }
	public required string KeycloakDeleteRealmRole { get; set; }

	public required string KeycloakCreateClientRole { get; set; }
	public required string KeycloakGetClientRole { get; set; }
	public required string KeycloakUpdateClientRole { get; set; }
	public required string KeycloakDeleteClientRole { get; set; }

	public required string KeycloakCreateClientScope { get; set; }
	public required string KeycloakGetClientScope { get; set; }
	public required string KeycloakUpdateClientScope { get; set; }
	public required string KeycloakDeleteClientScope { get; set; }

	public required string KeycloakCreateProtocolMapper { get; set; }
	public required string KeycloakGetProtocolMapper { get; set; }
	public required string KeycloakUpdateProtocolMapper { get; set; }
	public required string KeycloakDeleteProtocolMapper { get; set; }

	public required string KeycloakCreateRealmSettings { get; set; }
	public required string KeycloakGetRealmSettings { get; set; }
	public required string KeycloakPutRealmSettings { get; set; }
	public required string KeycloakDeleteRealmSettings { get; set; }

	public required string KeycloakToken { get; set; }
	public required string KeycloakAddUser { get; set; }
	public required string KeycloakDeleteUserById { get; set; }
	public required string KeycloakChangeUserPasswordById { get; set; }

	public required string KeycloakAssignRealmRoleToGroup { get; set; }
	public required string KeycloakUnassignRealmRoleToGroup { get; set; }
	public required string KeycloakGetRealmRolesOfGroup { get; set; }
}
