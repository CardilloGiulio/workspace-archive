using ExtraNet.Recruitments.Command.Abstractions.HumanResources;
using ExtraNet.Recruitments.Query.Abstractions.HumanResources;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExtraNet.Recruitments.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HumanResourcesController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task CreateHumanResource([FromBody] CreateHumanResource createResource)
    {
        await mediator.Send(createResource);
    }

    [HttpGet]
    public async Task<GetAllHumanResources.GetAllHumanResourcesResponse> GetAllHumanResources()
    {
        return await mediator.Send(new GetAllHumanResources());
    }

    [HttpGet("{id}")]
    public async Task<GetHumanResourceById.GetHumanResourceByIdResponse> GetHumanResourceById(Guid id)
    {
        return await mediator.Send(new GetHumanResourceById
		{
			Id = id
		});
    }

    [HttpPut("{id}")]
    public async Task UpdateHumanResource([FromBody] UpdateHumanResource updateResource, Guid id)
    {
        await mediator.Send(updateResource);
    }

    [HttpDelete("{id}")]
    public async Task DeleteHumanResource(Guid id)
    {
        await mediator.Send(new RemoveHumanResource
		{
			Id = id
		});
    }
}
