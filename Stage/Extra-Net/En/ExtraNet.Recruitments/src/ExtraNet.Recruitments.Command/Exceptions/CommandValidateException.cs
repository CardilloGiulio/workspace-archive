using ExtraNet.Recruitments.Domain.Exceptions;

namespace ExtraNet.Recruitments.Command.Exceptions;

public class CommandValidateException(string message) : CommandException(message, DomainErrorType.Validation)
{
}
