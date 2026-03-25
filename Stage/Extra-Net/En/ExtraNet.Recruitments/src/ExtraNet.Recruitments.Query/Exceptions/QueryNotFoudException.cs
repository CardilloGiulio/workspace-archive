using ExtraNet.Recruitments.Domain.Exceptions;

namespace ExtraNet.Recruitments.Query.Exceptions;

public class QueryNotFoudException(string message) : QueryException(message, DomainErrorType.NotFound)
{
}
