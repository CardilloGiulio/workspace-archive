namespace ExtraNet.Identity.Keycloak.Client.Realm;

public class ClientScope
{
	public required Guid Id { get; set; }
	public required string Name { get; set; }
	public List<ProtocolMapper> ProtocolMappers { get; set; } = [];
}
