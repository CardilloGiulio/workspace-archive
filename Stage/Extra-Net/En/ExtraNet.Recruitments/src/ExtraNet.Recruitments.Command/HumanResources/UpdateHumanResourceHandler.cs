using ExtraNet.Recruitments.Command.Abstractions.HumanResources;
using ExtraNet.Recruitments.Command.Exceptions;
using ExtraNet.Recruitments.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ExtraNet.Recruitments.Command.HumanResources;

public class UpdateHumanResourceHandler(RecruitmentsDbContext dbContext) : IRequestHandler<UpdateHumanResource>
{
    public async Task Handle(UpdateHumanResource request, CancellationToken cancellationToken)
    {
        var resource = await dbContext.HumanResources.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken) ?? throw new CommandNotFoundException("The requested Resource was not found with this Id");

        resource.FirstName = request.FirstName;
        resource.LastName = request.LastName;
        resource.Email = request.Email;
        resource.BirthDate = request.BirthDate;

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
