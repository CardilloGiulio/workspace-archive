using MediatR;

namespace ExtraNet.Recruitments.Query.Abstractions.HumanResources;

    public class GetAllHumanResources : IRequest<GetAllHumanResources.GetAllHumanResourcesResponse>
    {
        public class GetAllHumanResourcesResponse
        {
            public List<HumanResource> HumanResources { get; set; } = [];

		public class HumanResource
		{
			public required Guid Id { get; set; }
			public required string FirstName { get; set; }
			public required string LastName { get; set; }
			public required string Email { get; set; }
			public required DateOnly BirthDate { get; set; }
		}
	}
}
