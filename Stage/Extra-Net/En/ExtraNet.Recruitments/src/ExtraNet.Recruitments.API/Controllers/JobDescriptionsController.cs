using ExtraNet.Recruitments.Command.Abstractions.JobDescriptions;
using ExtraNet.Recruitments.Query.Abstractions.JobDescriptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExtraNet.Recruitments.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class JobDescriptionsController(IMediator mediator) : Controller
{
    [HttpPost]
    public async Task CreateJobDescription([FromBody] CreateJobDescriptionRequest request)
    {
        await mediator.Send(request);
    }

	[HttpGet]
	public async Task<GetAllJobDescriptions.GetAllJobDescriptionsResponse> GetAllJobDescriptions()
    {
		return await mediator.Send(new GetAllJobDescriptions());
	}

    [HttpGet("{id}")]
    public async Task<GetJobDescriptionById.GetJobDescriptionByIdResponse> GetJobDescriptionById(Guid id)
    {
        return await mediator.Send(new GetJobDescriptionById
        {
            Id = id
        });
    }

    [HttpPut("{id}")]
    public async Task UpdateJobDescription(Guid id, [FromBody] UpdateJobDescriptionRequest request)
    {
        await mediator.Send(request);
    }

    [HttpDelete("{id}")]
    public async Task DeleteJobDescription(Guid id)
    {
        await mediator.Send(new DeleteJobDescriptionRequest 
        { 
            Id = id 
        });
    }
}
