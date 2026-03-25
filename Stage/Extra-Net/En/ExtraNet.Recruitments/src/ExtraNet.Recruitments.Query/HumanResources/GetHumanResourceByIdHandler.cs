using ExtraNet.Recruitments.Persistence;
using ExtraNet.Recruitments.Query.Abstractions.HumanResources;
using ExtraNet.Recruitments.Query.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ExtraNet.Recruitments.Query.HumanResources;

public class GetHumanResourceByIdHandler(RecruitmentsDbContext dbContext) : IRequestHandler<GetHumanResourceById, GetHumanResourceById.GetHumanResourceByIdResponse>
{
    public async Task<GetHumanResourceById.GetHumanResourceByIdResponse> Handle(GetHumanResourceById request, CancellationToken cancellationToken)
    {
        var resource = await dbContext.HumanResources
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken) ?? throw new QueryNotFoudException("The requested Human Resource was not found with this Id");
        
        return new GetHumanResourceById.GetHumanResourceByIdResponse
        {
            Id = resource.Id,
            FirstName = resource.FirstName,
            LastName = resource.LastName,
            Email = resource.Email,
            BirthDate = resource.BirthDate
        };
    }
}
