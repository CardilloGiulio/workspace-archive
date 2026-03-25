using Newtonsoft.Json;

namespace ExtraNet.Identity.Keycloak.Client.User;

public class User()
{
	[JsonProperty("email", NullValueHandling = NullValueHandling.Ignore)]
	public string? Email { get; set; }
	[JsonProperty("credentials", NullValueHandling = NullValueHandling.Ignore)]
	public List<Credentials>? Credentials { get; set; }
	[JsonProperty("groups", NullValueHandling = NullValueHandling.Ignore)]
	public List<string>? Groups { get; set; }
	[JsonProperty("enabled", NullValueHandling = NullValueHandling.Ignore)]
	public bool? Enabled { get; set; }
}
