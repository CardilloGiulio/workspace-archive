namespace ExtraNet.Recruitments.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddApiServices(builder.Configuration);

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            var app = builder.Build();

			// Configure the HTTP request pipeline.
			
            app.UseSwagger();
			app.UseSwaggerUI();

			app.UseAuthorization();

            app.UseCors();


            app.MapControllers();

            app.Run();
        }
    }
}