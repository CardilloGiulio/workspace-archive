namespace ExtraNet.ApiGateway
{
	public class OcelotOptions
	{
		public string? SwaggerHttpRelativePath { get; set; }
		public string? TrimmedSwaggerHttpRelativePath => string.IsNullOrWhiteSpace(SwaggerHttpRelativePath?.Trim('/')) ? null : SwaggerHttpRelativePath?.Trim('/');
	}
}
