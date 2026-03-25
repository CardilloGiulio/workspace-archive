using System.Security.Claims;

namespace ExtraNet.Recruitments.API
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetId(this ClaimsPrincipal claimsPrincipal)
        {
            var subClaim = claimsPrincipal.Claims
                .FirstOrDefault(c => c.Type == "sub")
                ??
                throw new Exception();

            if (!Guid.TryParse(subClaim.Value, out Guid id))
                throw new Exception();

            return id;
        }
    }
}