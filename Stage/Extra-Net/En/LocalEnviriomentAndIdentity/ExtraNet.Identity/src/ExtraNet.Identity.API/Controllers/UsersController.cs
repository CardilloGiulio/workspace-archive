using Microsoft.AspNetCore.Mvc;
using MediatR;
using ExtraNet.Identity.Command.Abstraction.User;

namespace ExtraNet.Identity.API.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController(
	IMediator _mediator
	) : ControllerBase
{

	[HttpPost()]
	public async Task<IActionResult> Post([FromBody] AddUser user, CancellationToken cancellationToken)
	{
		var response = await _mediator.Send(user, cancellationToken);

		if (response != null && !string.IsNullOrEmpty(response.UserId))
		{
			return CreatedAtAction(nameof(Post), new { id = response.UserId }, response);
		}

		return BadRequest("User creation failed.");
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
	{
		var request = new DeleteUserById
		{
			Id = id
		};
		var response = await _mediator.Send(request, cancellationToken);
		if (response.IsSuccessStatusCode)
		{
			return NoContent();
		}

		return StatusCode((int)response.StatusCode, new
		{
			response.StatusCode,
			response.ReasonPhrase,
			Content = await response.Content.ReadAsStringAsync(cancellationToken)
		});
	}

	[HttpPut()]
	public async Task<IActionResult> Put(ChangeUserPasswordById changeUserPasswordById, CancellationToken cancellationToken)
	{
		var response = await _mediator.Send(changeUserPasswordById, cancellationToken);

		if (response.IsSuccessStatusCode)
		{
			return Ok(response);
		}
		return BadRequest("User change password failed.");
	}
}