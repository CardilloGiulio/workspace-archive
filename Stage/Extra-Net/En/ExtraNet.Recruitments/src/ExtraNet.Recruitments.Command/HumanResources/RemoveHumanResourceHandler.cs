using ExtraNet.Recruitments.Command.Abstractions.HumanResources;
using ExtraNet.Recruitments.Command.Exceptions;
using ExtraNet.Recruitments.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ExtraNet.Recruitments.Command.HumanResources;

public class RemoveHumanResourceHandler(RecruitmentsDbContext dbContext) : IRequestHandler<RemoveHumanResource>
{
    public async Task Handle(RemoveHumanResource request, CancellationToken cancellationToken)
    {
        var resource = await dbContext.HumanResources.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken) ?? throw new CommandNotFoundException("The requested Resource was not found with this Id");

        dbContext.HumanResources.Remove(resource);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
