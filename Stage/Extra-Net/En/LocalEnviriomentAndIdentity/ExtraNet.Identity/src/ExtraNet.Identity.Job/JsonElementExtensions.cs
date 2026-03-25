using System.Text.Json.Nodes;
using System.Text.Json;

namespace ExtraNet.Identity.Job;

public static class JsonElementExtensions
{
	public static JsonElement SetId(this JsonElement representation, Guid id)
	{
		var jsonObject = JsonNode.Parse(representation.ToString()).AsObject();

		jsonObject["id"] = id;

		return JsonSerializer.Deserialize<JsonDocument>(jsonObject.ToJsonString()).RootElement;
	}
}
