using GiulioCardillo.Exercise1.Command.Collections;
using GiulioCardillo.Exercise1.Domain.Collections;
using GiulioCardillo.Exercise1.Query.Collections;
using GiulioCardillo.Exercize1.Persistence.Collections;

namespace GiulioCardillo.Exercize1.API
{
    public static class ServiceCollectionExtension
    {
        private static IServiceCollection AddApi(this IServiceCollection services)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            return services;
        }

        public static IServiceCollection AddApiServices(this IServiceCollection services)
        {
            services.AddApi();
            services.AddPersistence();
            services.AddDomain();
            services.AddQuery();
            services.AddCommand();

            return services;
        }
    }
}
