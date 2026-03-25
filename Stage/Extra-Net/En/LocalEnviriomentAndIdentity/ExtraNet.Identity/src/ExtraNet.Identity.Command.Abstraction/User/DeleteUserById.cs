using MediatR;

namespace ExtraNet.Identity.Command.Abstraction.User;
public class DeleteUserById : IRequest<HttpResponseMessage>
{
	public required Guid Id { get; set; }
}