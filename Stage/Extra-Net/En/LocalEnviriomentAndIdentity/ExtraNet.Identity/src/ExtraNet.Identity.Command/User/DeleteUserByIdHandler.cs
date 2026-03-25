using ExtraNet.Identity.Command.Abstraction.User;
using ExtraNet.Identity.Keycloak.Client.User;
using MediatR;

namespace ExtraNet.Identity.Command.User;

public class DeleteUserByIdHandler(
IUserService _service
) : IRequestHandler<DeleteUserById, HttpResponseMessage>
{
	public async Task<HttpResponseMessage> Handle(DeleteUserById request, CancellationToken cancellationToken)
	{
		return await _service.DeleteUserByIdAsync(request.Id, cancellationToken);
	}
}
