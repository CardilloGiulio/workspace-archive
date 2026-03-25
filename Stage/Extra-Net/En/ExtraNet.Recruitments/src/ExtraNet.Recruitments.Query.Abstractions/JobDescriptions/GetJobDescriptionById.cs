using MediatR;

namespace ExtraNet.Recruitments.Query.Abstractions.JobDescriptions;

public class GetJobDescriptionById : IRequest<GetJobDescriptionById.GetJobDescriptionByIdResponse>
{
    public Guid Id { get; set; }

    public class GetJobDescriptionByIdResponse
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
