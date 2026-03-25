using Microsoft.Extensions.DependencyInjection;

namespace GiulioCardillo.Exercise1.Domain.Collections
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddDomain(this IServiceCollection services)
        {
            services.AddScoped<IMarketService, MarketService>();
            services.AddScoped<IPhoneService, PhoneService>();
            return services;
        }
    }
}
