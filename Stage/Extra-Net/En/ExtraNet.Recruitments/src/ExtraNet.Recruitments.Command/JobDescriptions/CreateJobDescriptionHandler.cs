using ExtraNet.Recruitments.Command.Abstractions.JobDescriptions;
using ExtraNet.Recruitments.Domain.JobDescriptions;
using ExtraNet.Recruitments.Persistence;
using MediatR;

namespace ExtraNet.Recruitments.Command.JobDescriptions;

public class CreateJobDescriptionHandler(RecruitmentsDbContext dbContext) : IRequestHandler<CreateJobDescriptionRequest>
{
    public async Task Handle(CreateJobDescriptionRequest request, CancellationToken cancellationToken)
    {
        var jobDescription = new JobDescription
        {
            Id = request.Id,
            Title = request.Title,
            Description = request.Description,
            CompanyName = request.CompanyName,
            Location = request.Location,
            PostedDate = request.PostedDate,
            ContactEmail = request.ContactEmail,
            Customer = new Customer
            {
                Name = request.CustomerJob.Name,
                Age = request.CustomerJob.Age,
                Address = request.CustomerJob.Address,
                Id = request.CustomerJob.Id,
                PhoneNumber = request.CustomerJob.PhoneNumber,
                Email = request.CustomerJob.Email,
            }
        };

        dbContext.JobDescriptions.Add(jobDescription);

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
