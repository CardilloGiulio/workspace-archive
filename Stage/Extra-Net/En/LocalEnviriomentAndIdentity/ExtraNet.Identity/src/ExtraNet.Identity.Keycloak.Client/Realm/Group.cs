namespace ExtraNet.Identity.Keycloak.Client.Realm;

public class Group
{
	public required Guid Id { get; set; }
	public required string Name { get; set; }
	public List<string> RealmRoles { get; set; } = [];
}
