namespace ExtraNet.Identity.Keycloak.Client.Keycloak
{
	public interface IBearerTokenRetriever
	{
		Task<string?> GetJwtAsync(CancellationToken cancellationToken);
	}
}
