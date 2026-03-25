namespace ExtraNet.ApiGateway;

public class Program
{
	public static async Task Main(string[] args)
	{
		await CreateHostBuilder(args)
			.Build()
			.RunAsync();
	}

	public static IHostBuilder CreateHostBuilder(string[] args) =>
		Host
			.CreateDefaultBuilder(args)
			.ConfigureAppConfiguration((hostingContext, config) =>
			{
				config.Sources.Clear();
				config
					.AddJsonFile("appsettings.json")
					.AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json")
					.AddOcelotJsonFile(hostingContext.HostingEnvironment.EnvironmentName)
					.AddEnvironmentVariables()
					.AddCommandLine(args);
			})
			.ConfigureServices((hostingContext, services) =>
				services.AddApiGatewayServices(hostingContext.Configuration))
			.ConfigureWebHostDefaults(webBuilder => webBuilder.UseStartup<Startup>());
}