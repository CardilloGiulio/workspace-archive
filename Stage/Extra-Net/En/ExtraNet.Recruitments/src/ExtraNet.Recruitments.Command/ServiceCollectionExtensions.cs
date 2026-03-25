using Microsoft.Extensions.DependencyInjection;

namespace ExtraNet.Recruitments.Command;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddCommandServices(this IServiceCollection services)
	{
		services.AddMediatR(c =>
		{
			c.RegisterServicesFromAssemblyContaining<AssemblyInfo>();
		});
		return services;
	}
}