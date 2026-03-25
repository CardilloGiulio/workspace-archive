
using MediatR;

namespace ExtraNet.Recruitments.Command.Abstractions.JobDescriptions;

public class DeleteJobDescriptionRequest : IRequest
{
    public required Guid Id { get; set; }
}
