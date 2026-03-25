using Microsoft.Extensions.DependencyInjection;

namespace ExtraNet.Recruitments.Query
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection AddQueryServices(this IServiceCollection services)
		{
			services.AddMediatR(c =>
			{
				c.RegisterServicesFromAssemblyContaining<AssemblyInfo>();
			});
			return services;
		}
	}
}
