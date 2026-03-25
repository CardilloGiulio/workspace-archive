using ExtraNet.Recruitments.Domain.Exceptions;

namespace ExtraNet.Recruitments.Query.Exceptions;

public class QueryConflictException(string message) : QueryException(message, DomainErrorType.Conflict)
{
}
