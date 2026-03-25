using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace ExtraNet.Recruitments.API.GlobalException
{
    public sealed class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> _logger, IStatusCodeResolver statusCodeResolver) : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            _logger.LogError(exception, "Error occurred: {Message}", exception.Message);

            var statusCode = statusCodeResolver.ResolveStatus(exception);

            var problemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = exception.GetType().Name,
                Detail = exception.Message

            };

            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }
    }
}
