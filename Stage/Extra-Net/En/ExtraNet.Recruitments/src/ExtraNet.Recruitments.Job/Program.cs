using ExtraNet.Recruitments.Job;

public class Program
{
    public static async Task Main(string[] args)
    {
        await CreateHostBuilder(args).Build().RunAsync();
    }
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host
        .CreateDefaultBuilder(args)
            .ConfigureServices((hostContext, services) =>
            {
                services.ConfigureJobServices(hostContext.Configuration);
            });
}