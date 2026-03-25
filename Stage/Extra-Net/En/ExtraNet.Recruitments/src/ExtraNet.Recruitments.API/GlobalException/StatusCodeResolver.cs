using ExtraNet.Recruitments.Domain.Exceptions;
using ExtraNet.Recruitments.Query.Exceptions;
using ExtraNet.Recruitments.Command.Exceptions;

namespace ExtraNet.Recruitments.API.GlobalException;

public class StatusCodeResolver : IStatusCodeResolver
{
    private readonly Dictionary<Type, HttpStatus> _statusCodeMap = new()
    {
        { typeof(DomainNotFoundException), HttpStatus.NotFound },
        { typeof(DomainConflictException), HttpStatus.Conflict },
        { typeof(DomainValidateException), HttpStatus.BadRequest },
        { typeof(CommandNotFoundException), HttpStatus.BadRequest },
        { typeof(CommandConflictException), HttpStatus.Conflict },
        { typeof(CommandValidateException), HttpStatus.BadRequest },
        { typeof(QueryNotFoudException), HttpStatus.NotFound },
        { typeof(QueryConflictException), HttpStatus.Conflict },
        { typeof(QueryValidateException), HttpStatus.BadRequest }
    };

    public int ResolveStatus(Exception exception)
    {
        return (int)(_statusCodeMap.TryGetValue(exception.GetType(), out var statusCode)
            ? statusCode
            : HttpStatus.InternalServerError
        );
    }
}
