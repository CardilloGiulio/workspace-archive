using MediatR;

namespace ExtraNet.Recruitments.Query.Abstractions.HumanResources;

public class GetHumanResourceById : IRequest<GetHumanResourceById.GetHumanResourceByIdResponse>
{
    public Guid Id { get; set; }

    public class GetHumanResourceByIdResponse
    {
        public required Guid Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required DateOnly BirthDate { get; set; }
    }
}
