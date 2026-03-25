namespace ExtraNet.Recruitments.API.GlobalException
{
    public interface IStatusCodeResolver
    {
        int ResolveStatus(Exception exception);
    }
}