namespace ExtraNet.Identity.Keycloak.Client.Realm;

public class Roles
{
	public List<Role> Realm { get; set; } = [];
	public Dictionary<string, List<Role>> Client { get; set; } = [];
}
