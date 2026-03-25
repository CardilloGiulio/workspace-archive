using MediatR;

namespace ExtraNet.Recruitments.Command.Abstractions.JobDescriptions;

public class UpdateJobDescriptionRequest : IRequest
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public required string CompanyName { get; set; }
    public string? Location { get; set; }
    public required DateTime PostedDate { get; set; }
    public string? ContactEmail { get; set; }
    public CustomerJobUpdateType CustomerJob { get; set; }
    
    public class CustomerJobUpdateType
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public Guid Id { get; set; }
        public int PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
