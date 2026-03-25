using Ocelot.Middleware;

namespace ExtraNet.ApiGateway;

public class Startup
{
	public static void Configure(
		IApplicationBuilder app,
		IWebHostEnvironment env,
		IConfiguration configuration
	)
	{
		app.UseDeveloperExceptionPage();

		app.UseSwagger();

		var ocelotOptions = configuration.GetSection("Ocelot").Get<OcelotOptions>()!;

		app.UseSwaggerForOcelotUI(
			x =>
			{
				if (ocelotOptions.TrimmedSwaggerHttpRelativePath != null)
				{
					x.PathToSwaggerGenerator = $"/{ocelotOptions.TrimmedSwaggerHttpRelativePath}{x.PathToSwaggerGenerator}";
					x.DownstreamSwaggerEndPointBasePath = $"/{ocelotOptions.TrimmedSwaggerHttpRelativePath}{x.DownstreamSwaggerEndPointBasePath}";
				}
			},
			x =>
			{
				if (ocelotOptions.TrimmedSwaggerHttpRelativePath != null)
				{
					x.RoutePrefix = $"{ocelotOptions.TrimmedSwaggerHttpRelativePath}/{x.RoutePrefix}";
				}
			}
		);

		app.UseRouting();

		app.UseCors();

		app.UseAuthentication();

		app.UseAuthorization();

		app
			.UseEndpoints(
				endpoints =>
				{
					endpoints
					.MapControllers();
				}
			);

		app
			.UseOcelot()
			.Wait();
	}
}