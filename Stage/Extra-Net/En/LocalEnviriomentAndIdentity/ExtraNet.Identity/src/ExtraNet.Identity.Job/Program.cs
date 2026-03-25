namespace ExtraNet.Identity.Job;

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
			.ConfigureServices((hostingContext, services) => services
			.AddJobServices(hostingContext.Configuration));
}
