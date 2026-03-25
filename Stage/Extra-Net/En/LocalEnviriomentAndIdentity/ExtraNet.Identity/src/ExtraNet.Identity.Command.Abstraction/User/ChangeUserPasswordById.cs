using MediatR;

namespace ExtraNet.Identity.Command.Abstraction.User
{
	public class ChangeUserPasswordById : IRequest<HttpResponseMessage>
	{
		public required Guid UserId { get; set; }
		public required string NewPassword { get; set; }
	}
}
