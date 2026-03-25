using ExtraNet.Identity.Keycloak.Client.User;
using MediatR;

namespace ExtraNet.Identity.Command.Abstraction.User;

public class AddUser : IRequest<UserCreationResponse>
{
	public required string Email { get; set; }
	public string? TemporaryPassword { get; set; }
	public List<string>? Groups { get; set; }
	public bool Enabled { get; set; } = true;
}