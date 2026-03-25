using ExtraNet.Recruitments.Command.Abstractions.HumanResources;
using ExtraNet.Recruitments.Command.Exceptions;
using ExtraNet.Recruitments.Domain.HumanResources;
using ExtraNet.Recruitments.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ExtraNet.Recruitments.Command.HumanResources;

public class CreateHumanResourceHandler(RecruitmentsDbContext dbContext) : IRequestHandler<CreateHumanResource>
{
    public async Task Handle(CreateHumanResource request, CancellationToken cancellationToken)
    {
        var resource = new HumanResource
        {
            Id = request.Id,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            BirthDate = request.BirthDate
        };

        var resources = await dbContext.HumanResources.ToListAsync(cancellationToken);
        
        if (resources.Any(r => r.Id == request.Id))
            throw new CommandConflictException("There was an error while creating this resource");

        await dbContext.HumanResources.AddAsync(resource, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
