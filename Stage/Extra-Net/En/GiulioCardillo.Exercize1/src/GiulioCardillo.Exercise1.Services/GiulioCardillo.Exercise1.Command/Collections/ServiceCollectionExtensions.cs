using Microsoft.Extensions.DependencyInjection;

namespace GiulioCardillo.Exercise1.Command.Collections
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCommand(this IServiceCollection services)
        {
            services.AddMediatR(c =>
            {
                c.RegisterServicesFromAssemblyContaining<AssemblyInfo>();
            });
            return services;
        }
    }
}
