namespace ExtraNet.Recruitments.Domain.Exceptions;

public class DomainConflictException(string message) : ExceptionBase(message, DomainErrorType.Conflict)
{
}
