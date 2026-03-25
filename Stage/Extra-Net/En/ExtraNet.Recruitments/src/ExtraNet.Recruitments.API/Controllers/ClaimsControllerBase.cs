using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ExtraNet.Recruitments.API.Controllers;

public abstract class ClaimsControllerBase : ControllerBase
{
    private readonly ClaimsPrincipal _claimsPrincipal = ClaimsPrincipal.Current ?? throw new Exception();
    
    protected Guid GetIdFromClaims()
    {
        var id = _claimsPrincipal.GetId();

        return id;
    }
}