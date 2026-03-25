using ExtraNet.Recruitments.Domain.Exceptions;

namespace ExtraNet.Recruitments.Query.Exceptions;

public class QueryValidateException(string message) : QueryException(message, DomainErrorType.Validation)
{
}
