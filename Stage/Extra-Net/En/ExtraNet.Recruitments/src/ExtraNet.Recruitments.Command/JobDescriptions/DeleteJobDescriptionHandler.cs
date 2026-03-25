using ExtraNet.Recruitments.Command.Abstractions.JobDescriptions;
using ExtraNet.Recruitments.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ExtraNet.Recruitments.Command.JobDescriptions;

public class DeleteJobDescriptionHandler(RecruitmentsDbContext dbContext) : IRequestHandler<DeleteJobDescriptionRequest>
{
    public async Task Handle(DeleteJobDescriptionRequest request, CancellationToken cancellationToken)
    {
        var jobDescription = await dbContext.JobDescriptions.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (jobDescription == null)
            return;

        dbContext.JobDescriptions.Remove(jobDescription);

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
