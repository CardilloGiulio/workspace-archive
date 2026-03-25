namespace ExtraNet.ApiGateway
{
	public class AuthenticationOptions
	{
		public string AuthenticationScheme { get; set; }
		public bool RequireHttpsMetadata { get; set; }
		public string Authority { get; set; }
		public bool IncludeErrorDetails { get; set; }
		public TokenValidationOptions TokenValidation { get; set; }

		public class TokenValidationOptions
		{
			public string ValidIssuer { get; set; }
			public string[] ValidAudiences { get; set; }
			public bool ValidateAudience { get; set; }
			public bool ValidateIssuerSigningKey { get; set; }
			public bool ValidateIssuer { get; set; }
			public bool ValidateLifetime { get; set; }
		}
	}
}
