using ExtraNet.Recruitments.Domain.Exceptions;

namespace ExtraNet.Recruitments.Query.Exceptions;

public abstract class QueryException(string message, DomainErrorType domainErrorType) : ExceptionBase(message, domainErrorType)
{
}
