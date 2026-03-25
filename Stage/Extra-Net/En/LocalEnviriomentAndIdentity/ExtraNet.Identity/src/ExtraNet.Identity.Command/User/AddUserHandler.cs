using ExtraNet.Identity.Command.Abstraction.User;
using ExtraNet.Identity.Keycloak.Client.User;
using MediatR;

namespace ExtraNet.Identity.Command.User;

public class AddUserHandler(
	IUserService _service
	) : IRequestHandler<AddUser, UserCreationResponse>
{
	public async Task<UserCreationResponse> Handle(AddUser request, CancellationToken cancellationToken)
	{
		var user = new Keycloak.Client.User.User
		{
			Email = request.Email,
			Groups = request.Groups,
			Enabled = request.Enabled
		};

		if (request.TemporaryPassword != null)
			user.Credentials = [
				new Credentials()
				{
					Temporary = true,
					Type = "password",
					Value = request.TemporaryPassword
				}
			];

		return await _service.AddUserAsync(user, cancellationToken);
	}

}

