namespace ExtraNet.Recruitments.Domain.Exceptions;

public class DomainNotFoundException(string message) : ExceptionBase(message, DomainErrorType.NotFound)
{
}
