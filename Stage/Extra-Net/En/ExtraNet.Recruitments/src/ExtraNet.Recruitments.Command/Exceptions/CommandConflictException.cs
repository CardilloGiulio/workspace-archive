using ExtraNet.Recruitments.Domain.Exceptions;

namespace ExtraNet.Recruitments.Command.Exceptions;

public class CommandConflictException(string message) : CommandException(message, DomainErrorType.Conflict)
{
}
