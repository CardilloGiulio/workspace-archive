using MediatR;

namespace ExtraNet.Recruitments.Query.Abstractions.JobDescriptions;

public class GetAllJobDescriptions : IRequest<GetAllJobDescriptions.GetAllJobDescriptionsResponse>
{
	public class GetAllJobDescriptionsResponse
    {
		public List<JobDescription> JobDescriptions { get; set; } = [];

		public class JobDescription
		{
			public required Guid Id { get; set; }
			public required string Title { get; set; }
			public string? Description { get; set; }
			public required string CompanyName { get; set; }
			public string? Location { get; set; }
			public required DateTime PostedDate { get; set; }
			public string? ContactEmail { get; set; }
		}
	}
}
