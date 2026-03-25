namespace ExtraNet.Recruitments.Domain.Exceptions;

public class ExceptionBase : Exception
{
    public DomainErrorType DomainErrorType { get; set; }

    protected ExceptionBase(string message, DomainErrorType domainErrorType) : base(message)
    {
        DomainErrorType = domainErrorType;
    }
}
