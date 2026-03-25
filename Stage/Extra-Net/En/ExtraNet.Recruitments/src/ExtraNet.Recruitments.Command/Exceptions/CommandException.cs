using ExtraNet.Recruitments.Domain.Exceptions;

namespace ExtraNet.Recruitments.Command.Exceptions;

public abstract class CommandException(string message, DomainErrorType domainErrorType) : ExceptionBase(message, domainErrorType)
{
}
