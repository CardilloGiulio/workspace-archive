using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ExtraNet.ApiGateway
{
	public class ConfigureJwtBearerOptions(IOptionsMonitor<AuthenticationOptions> _authenticationOptions) : IConfigureNamedOptions<JwtBearerOptions>
	{
		public void Configure(JwtBearerOptions options)
		{
			Configure(JwtBearerDefaults.AuthenticationScheme, options);
		}

		public void Configure(string? name, JwtBearerOptions options)
		{
			var authenticationOptions = _authenticationOptions.Get(name);

			options.Authority = authenticationOptions.Authority;
			options.IncludeErrorDetails = authenticationOptions.IncludeErrorDetails;
			options.TokenValidationParameters = new TokenValidationParameters
			{
				ValidIssuer = authenticationOptions.TokenValidation.ValidIssuer,
				ValidAudiences = authenticationOptions.TokenValidation.ValidAudiences,
				ValidateAudience = authenticationOptions.TokenValidation.ValidateAudience,
				ValidateIssuerSigningKey = authenticationOptions.TokenValidation.ValidateIssuerSigningKey,
				ValidateIssuer = authenticationOptions.TokenValidation.ValidateIssuer,
				ValidateLifetime = authenticationOptions.TokenValidation.ValidateLifetime
			};

			options.RequireHttpsMetadata = authenticationOptions.RequireHttpsMetadata;

			if (!authenticationOptions.RequireHttpsMetadata)
			{
				options.BackchannelHttpHandler = new HttpClientHandler
				{
					ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
				};
			}
		}
	}
}
