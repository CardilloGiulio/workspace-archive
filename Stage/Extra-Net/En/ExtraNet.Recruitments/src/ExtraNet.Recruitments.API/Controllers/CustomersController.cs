using ExtraNet.Recruitments.Query.Abstractions.JobDescriptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExtraNet.Recruitments.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CustomersController(IMediator mediator) : Controller
{
    [HttpGet]
    public async Task<GetAllCustomers.GetAllCustomersResponse> GetAllCustomers()
    {
        return await mediator.Send(new GetAllCustomers());
    }
}
