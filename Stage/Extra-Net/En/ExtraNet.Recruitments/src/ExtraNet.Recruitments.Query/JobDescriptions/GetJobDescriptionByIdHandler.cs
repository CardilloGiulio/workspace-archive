using ExtraNet.Recruitments.Persistence;
using ExtraNet.Recruitments.Query.Abstractions.JobDescriptions;
using ExtraNet.Recruitments.Query.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ExtraNet.Recruitments.Query.JobDescriptions;

public class GetJobDescriptionByIdHandler(RecruitmentsDbContext dbContext) : IRequestHandler<GetJobDescriptionById, GetJobDescriptionById.GetJobDescriptionByIdResponse>
{
    public async Task<GetJobDescriptionById.GetJobDescriptionByIdResponse> Handle(GetJobDescriptionById request, CancellationToken cancellationToken)
    {
		var jobDescription = await dbContext.JobDescriptions
			.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken) ?? throw new QueryNotFoudException("The requested Job Description was not found with this Id");

		return new GetJobDescriptionById.GetJobDescriptionByIdResponse
        {
			Id = request.Id,
			Title = jobDescription.Title,
			Description = jobDescription.Description,
			CompanyName = jobDescription.CompanyName,
			Location = jobDescription.Location,
			PostedDate = jobDescription.PostedDate,
			ContactEmail = jobDescription.ContactEmail
		};
    }
}
