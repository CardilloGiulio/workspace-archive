using ExtraNet.Recruitments.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ExtraNet.Recruitments.Query.Abstractions.HumanResources;

namespace ExtraNet.Recruitments.Query.HumanResources;

public class GetAllHumanResourcesHandler(RecruitmentsDbContext dbContext) : IRequestHandler<GetAllHumanResources, GetAllHumanResources.GetAllHumanResourcesResponse>
{
    public async Task<GetAllHumanResources.GetAllHumanResourcesResponse> Handle(GetAllHumanResources request, CancellationToken cancellationToken)
    {
        var humanResources = dbContext.HumanResources
            .Select(h => new GetAllHumanResources.GetAllHumanResourcesResponse.HumanResource
            {
                BirthDate = h.BirthDate,
                Email = h.Email,
                FirstName = h.FirstName,
                Id = h.Id,
                LastName = h.LastName
            });

        return new GetAllHumanResources.GetAllHumanResourcesResponse
        {
            HumanResources = await humanResources.ToListAsync(cancellationToken)
        };
    }
}
