using MediatR;

namespace ExtraNet.Recruitments.Query.Abstractions.JobDescriptions;

public class GetAllCustomers : IRequest<GetAllCustomers.GetAllCustomersResponse>
{
    public class GetAllCustomersResponse
    {
        public List<Customer> Customers { get; set; } = [];

        public class Customer
        {
            public string Name { get; set; }
            public int Age { get; set; }
            public string Address { get; set; }
            public Guid Id { get; set; }
            public int PhoneNumber { get; set; }
            public string Email { get; set; }
        }
    }
}
