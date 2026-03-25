using MediatR;

namespace ExtraNet.Recruitments.Command.Abstractions.HumanResources;

public class UpdateHumanResource : IRequest
{
    public required Guid Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required DateOnly BirthDate { get; set; }
}
