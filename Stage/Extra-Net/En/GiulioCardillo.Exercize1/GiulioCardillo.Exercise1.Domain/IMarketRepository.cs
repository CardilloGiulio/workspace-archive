namespace GiulioCardillo.Exercise1.Domain;

public interface IMarketRepository
{
    Task CreateMarketAsyncRep(Market market);
    Task DeleteMarketAsyncRep(Guid id);
    Task UpdateMarketAsyncRep(Market market);
    Task<Market> GetMarketAsyncRep(Guid id);
    Task<List<Market>> GetAllMarketsAsyncRep();
    Task DeletePhonesAsyncRep(Guid id);
    Task RenameMarketAsyncRep(string newName, Guid id);
    Task CreatePhoneAsyncRep(Phone phone, Guid id);
    Task DeletePhoneAsyncRep(Guid marketId, Guid phoneId);
    Task UpdatePhoneAsyncRep(Phone phone, Guid marketId);
}
