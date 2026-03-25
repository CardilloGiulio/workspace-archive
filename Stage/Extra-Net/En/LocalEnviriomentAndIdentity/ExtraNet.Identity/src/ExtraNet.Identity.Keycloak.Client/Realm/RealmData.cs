namespace ExtraNet.Identity.Keycloak.Client.Realm;

public class RealmData
{
	public List<Client> Clients { get; set; } = [];
	public List<Group> Groups { get; set; } = [];
	public Roles Roles { get; set; } = new Roles();
	public List<ClientScope> ClientScopes { get; set; } = [];
	public RealmSettings RealmSettings { get; set; }
}