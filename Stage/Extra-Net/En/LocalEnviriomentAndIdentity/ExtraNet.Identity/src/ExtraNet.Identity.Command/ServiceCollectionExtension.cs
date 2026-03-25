using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ExtraNet.Identity.Keycloak.Client;

namespace ExtraNet.Identity.Command;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddCommandServices(
        this IServiceCollection services
        , IConfigurationSection configurationSection
        )
    {
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssemblyContaining<AssemblyInfo>();
        });

        services
            .AddKeycloakClientServices(configurationSection);

        return services;
    }
}
