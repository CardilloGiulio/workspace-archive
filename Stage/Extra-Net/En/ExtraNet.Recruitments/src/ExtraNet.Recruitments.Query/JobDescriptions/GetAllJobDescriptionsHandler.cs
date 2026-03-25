using ExtraNet.Recruitments.Persistence;
using ExtraNet.Recruitments.Query.Abstractions.JobDescriptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ExtraNet.Recruitments.Query.JobDescriptions;

public class GetAllJobDescriptionsHandler(RecruitmentsDbContext dbContext) : IRequestHandler<GetAllJobDescriptions, GetAllJobDescriptions.GetAllJobDescriptionsResponse>
{
    public async Task<GetAllJobDescriptions.GetAllJobDescriptionsResponse> Handle(GetAllJobDescriptions request, CancellationToken cancellationToken)
    {
        var jobDescriptions = dbContext.JobDescriptions
            .Select(j => new GetAllJobDescriptions.GetAllJobDescriptionsResponse.JobDescription
            {
                CompanyName = j.CompanyName,
                Id = j.Id,
                PostedDate = j.PostedDate,
                Title = j.Title,
                ContactEmail = j.ContactEmail,
                Description = j.Description,
                Location = j.Location
            });

        return new GetAllJobDescriptions.GetAllJobDescriptionsResponse
        {
            JobDescriptions = await jobDescriptions.ToListAsync(cancellationToken)
		};
    }
}
