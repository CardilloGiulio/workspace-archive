using ExtraNet.Recruitments.Command.Abstractions.JobDescriptions;
using ExtraNet.Recruitments.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ExtraNet.Recruitments.Command.JobDescriptions;

public class UpdateJobDescriptionHandler(RecruitmentsDbContext dbContext) : IRequestHandler<UpdateJobDescriptionRequest>
{
    public async Task Handle(UpdateJobDescriptionRequest request, CancellationToken cancellationToken)
    {
        var jobDescription = await dbContext.JobDescriptions
            .Include(x => x.Customer)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (jobDescription == null)
            return;

        jobDescription.Title = request.Title;
        jobDescription.Description = request.Description;
        jobDescription.CompanyName = request.CompanyName;
        jobDescription.Location = request.Location;
        jobDescription.PostedDate = request.PostedDate;
        jobDescription.ContactEmail = request.ContactEmail;
        jobDescription.Customer.Name = request.CustomerJob.Name;
        jobDescription.Customer.Email = request.CustomerJob.Email;
        jobDescription.Customer.Id = request.CustomerJob.Id;
        jobDescription.Customer.PhoneNumber = request.CustomerJob.PhoneNumber;
        jobDescription.Customer.Email = request.CustomerJob.Email;
        
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
