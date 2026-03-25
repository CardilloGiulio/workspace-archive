using Newtonsoft.Json;

namespace ExtraNet.Identity.Keycloak.Client.User;

public class Credentials
{
	[JsonProperty("temporary", NullValueHandling = NullValueHandling.Ignore)]
	public bool? Temporary { get; set; }
	[JsonProperty("type", NullValueHandling = NullValueHandling.Ignore)]
	public string? Type { get; set; }
	[JsonProperty("value", NullValueHandling = NullValueHandling.Ignore)]
	public string? Value { get; set; }
}
