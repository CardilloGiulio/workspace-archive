namespace ExtraNet.Recruitments.Domain.JobDescriptions;

public class JobDescription
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public required string CompanyName { get; set; }
    public string? Location { get; set; }
    public required DateTime PostedDate { get; set; }
    public string? ContactEmail { get; set; }
    public Customer Customer { get; set; }
}
