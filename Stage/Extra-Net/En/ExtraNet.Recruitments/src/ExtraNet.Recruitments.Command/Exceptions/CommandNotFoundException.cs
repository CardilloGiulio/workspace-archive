using ExtraNet.Recruitments.Domain.Exceptions;

namespace ExtraNet.Recruitments.Command.Exceptions;

public class CommandNotFoundException(string message) : CommandException(message, DomainErrorType.NotFound)
{
}
