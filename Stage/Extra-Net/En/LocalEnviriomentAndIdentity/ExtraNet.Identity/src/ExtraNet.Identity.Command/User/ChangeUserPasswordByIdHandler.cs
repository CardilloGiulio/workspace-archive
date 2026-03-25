using ExtraNet.Identity.Command.Abstraction.User;
using ExtraNet.Identity.Keycloak.Client.User;
using MediatR;

namespace ExtraNet.Identity.Command.User
{
	public class ChangeUserPasswordByIdHandler(
		IUserService _service
		) : IRequestHandler<ChangeUserPasswordById, HttpResponseMessage>
	{
		public async Task<HttpResponseMessage> Handle(ChangeUserPasswordById request, CancellationToken cancellationToken)
		{
			return await _service.ChangeUserPasswordByIdAsync(request.UserId, request.NewPassword, cancellationToken);
		}
	}
}
