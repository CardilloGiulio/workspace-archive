namespace ExtraNet.Identity.Keycloak.Client.Realm;

public class Client
{
	public required Guid Id { get; set; }
	public required string Name { get; set; }
	public required string ClientId { get; set; }
}