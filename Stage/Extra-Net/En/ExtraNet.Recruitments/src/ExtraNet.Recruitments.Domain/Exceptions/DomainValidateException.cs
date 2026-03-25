namespace ExtraNet.Recruitments.Domain.Exceptions;

public class DomainValidateException(string message) : ExceptionBase(message, DomainErrorType.Validation)
{
}
