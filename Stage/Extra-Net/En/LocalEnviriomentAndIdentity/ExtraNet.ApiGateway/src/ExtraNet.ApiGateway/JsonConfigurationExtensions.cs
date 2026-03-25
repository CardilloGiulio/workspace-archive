using Newtonsoft.Json.Linq;
using System.Text.Json;
using System.Text;

namespace ExtraNet.ApiGateway;

public static class JsonConfigurationExtensions
{
	public static IConfigurationBuilder AddOcelotJsonFile(this IConfigurationBuilder builder, string environmentName)
	{
		var ocelotForEnv = File.ReadAllText($"ocelot.{environmentName}.json");
		var ocelotForEnvJson = JsonSerializer.Deserialize<Dictionary<string, object>>(ocelotForEnv);
		var globalConfigurationJson = ocelotForEnvJson["GlobalConfiguration"].ToString();
		var globalConfiguration = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(globalConfigurationJson);

		var ocelotBase = File.ReadAllText("ocelot.json");
		var ocelotBaseJObject = JObject.Parse(ocelotBase);
		var ocelotForEnvJObject = JObject.Parse(ocelotForEnv);

		ocelotBaseJObject.Merge(ocelotForEnvJObject, new JsonMergeSettings
		{
			MergeArrayHandling = MergeArrayHandling.Merge
		});

		var modules = new[]
		{
            "Timesheets",
            $"Timesheets.{environmentName}",
            "Timesheets.Customers",
            $"Timesheets.Customers.{environmentName}",
            "Timesheets.Timesheet",
            $"Timesheets.Timesheet.{environmentName}",
            "Timesheets.Images",
            $"Timesheets.Images.{environmentName}",
            "Timesheets.Employees",
            $"Timesheets.Employees.{environmentName}",
            "Timesheets.Documents",
            $"Timesheets.Documents.{environmentName}",
            "Timesheets.Contracts",
            $"Timesheets.Contracts.{environmentName}",
            "Identity",
            $"Identity.{environmentName}",
            "Identity.Users",
            $"Identity.Users.{environmentName}",
            "Recruitments",
            $"Recruitments.{environmentName}",
            "Recruitments.HumanResources",
            $"Recruitments.HumanResources.{environmentName}",
            "Recruitments.JobDescriptions",
            $"Recruitments.JobDescriptions.{environmentName}",
            "Recruitments.Customers",
            $"Recruitments.Customers.{environmentName}"
        };

		var filesToInclude = modules
			.SelectMany(module => new[]
			{
					$"ocelot.{module}.json"
			});

		foreach (var file in filesToInclude)
		{
			if (File.Exists(file))
			{
				var extraJson = JObject.Parse(File.ReadAllText(file));
				ocelotBaseJObject.Merge(extraJson, new JsonMergeSettings
				{
					MergeArrayHandling = MergeArrayHandling.Merge
				});
			}
		}

		var ocelotMergedJson = ocelotBaseJObject.ToString();

		foreach (var configuration in globalConfiguration)
		{
			var key = "{" + configuration.Key + "}";

			if (configuration.Value.ValueKind is JsonValueKind.Number or JsonValueKind.False or JsonValueKind.True)
				key = "\"" + key + "\"";

			ocelotMergedJson = ocelotMergedJson.Replace(key, configuration.Value.ToString());
			ocelotMergedJson = ocelotMergedJson.Replace(key.Trim('"'), configuration.Value.ToString());
		}

		var stream = new MemoryStream(Encoding.UTF8.GetBytes(ocelotMergedJson));
		builder.AddJsonStream(stream);

		return builder;
	}
}
