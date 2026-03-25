namespace ExtraNet.Identity.Keycloak.Client.User;

public interface IUserService
{
	public Task<UserCreationResponse?> AddUserAsync(User user, CancellationToken cancellationToken);
	public Task<HttpResponseMessage> DeleteUserByIdAsync(Guid Id, CancellationToken cancellationToken);
	public Task<HttpResponseMessage> ChangeUserPasswordByIdAsync(Guid userId, string newPassword, CancellationToken cancellationToken);
}
