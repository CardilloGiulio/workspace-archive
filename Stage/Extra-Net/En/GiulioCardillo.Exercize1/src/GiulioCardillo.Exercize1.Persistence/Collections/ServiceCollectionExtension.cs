using GiulioCardillo.Exercise1.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace GiulioCardillo.Exercize1.Persistence.Collections
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services)
        {
            services.AddScoped<IPhoneRepository, PhonesRepository>();
            services.AddScoped<IMarketRepository, MarketRepository>();
            services.AddScoped<DbContext, MyDbContext>();
            services.AddDbContext<MyDbContext>();
            return services;
        }
    }
}
