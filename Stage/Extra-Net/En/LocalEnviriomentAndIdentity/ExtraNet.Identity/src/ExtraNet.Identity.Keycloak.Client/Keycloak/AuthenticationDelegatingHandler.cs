using System.Net.Http.Headers;

namespace ExtraNet.Identity.Keycloak.Client.Keycloak;

public class AuthenticationDelegatingHandler(IBearerTokenRetriever _bearerTokenRetriever) : DelegatingHandler
{
	protected override async Task<HttpResponseMessage> SendAsync(
		HttpRequestMessage request,
		CancellationToken cancellationToken
	)
	{
		var token = await _bearerTokenRetriever
			.GetJwtAsync(cancellationToken)
			??
			throw new Exception("Authentication failed");

		request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

		return await base
			.SendAsync(request, cancellationToken);
	}
}
