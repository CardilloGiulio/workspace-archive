using MediatR;

namespace ExtraNet.Recruitments.Command.Abstractions.HumanResources;

public class RemoveHumanResource : IRequest
{
    public required Guid Id { get; set; }
}
