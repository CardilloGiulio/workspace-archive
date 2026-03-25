using MediatR;
using ExtraNet.Recruitments.Query.Abstractions.JobDescriptions;
using Microsoft.EntityFrameworkCore;
using ExtraNet.Recruitments.Persistence;

namespace ExtraNet.Recruitments.Query.JobDescriptions
{
    public class GetAllCustomersHandler(RecruitmentsDbContext dbContext) : IRequestHandler<GetAllCustomers, GetAllCustomers.GetAllCustomersResponse>
    {

        public async Task<GetAllCustomers.GetAllCustomersResponse> Handle(GetAllCustomers request, CancellationToken cancellationToken)
        {
            var customers = await dbContext.JobDescriptions
                .Where(jd => jd.Customer != null)
                .Select(jd => jd.Customer)
                .Select(customer => new GetAllCustomers.GetAllCustomersResponse.Customer
                {
                    Name = customer.Name,
                    Age = customer.Age,
                    Address = customer.Address,
                    Id = customer.Id,
                    PhoneNumber = customer.PhoneNumber,
                    Email = customer.Email
                })
                .ToListAsync(cancellationToken);

            return new GetAllCustomers.GetAllCustomersResponse { Customers = new List<GetAllCustomers.GetAllCustomersResponse.Customer>(customers) };
        }
    }
}
