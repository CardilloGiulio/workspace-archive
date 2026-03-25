using Microsoft.EntityFrameworkCore;
using ExtraNet.Recruitments.Persistence;

namespace ExtraNet.Recruitments.Job;

public class ApplyMigrationsBackgroundService(
    IHostApplicationLifetime hostApplicationLifetime, 
    IServiceProvider serviceProvider
) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await using var scope = serviceProvider.CreateAsyncScope();

        var dbContext = scope.ServiceProvider.GetRequiredService<RecruitmentsDbContext>();

        await dbContext.Database.MigrateAsync(stoppingToken);

        hostApplicationLifetime.StopApplication();
    }
}
