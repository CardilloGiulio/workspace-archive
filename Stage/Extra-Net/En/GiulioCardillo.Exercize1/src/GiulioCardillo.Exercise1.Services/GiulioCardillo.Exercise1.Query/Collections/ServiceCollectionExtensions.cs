using Microsoft.Extensions.DependencyInjection;

namespace GiulioCardillo.Exercise1.Query.Collections
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddQuery(this IServiceCollection services)
        {
            services.AddMediatR(c =>
            {
                c.RegisterServicesFromAssemblyContaining<AssemblyInfo>();
            });
            return services;
        }
    }
}
