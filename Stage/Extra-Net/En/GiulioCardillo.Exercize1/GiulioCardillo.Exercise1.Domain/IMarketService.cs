namespace GiulioCardillo.Exercise1.Domain;

public interface IMarketService
{
    Task CreateMarketAsync(Market market);
    Task<bool> CheckIfMarketExistsAsync(Guid marketId);
    Task DeleteMarketAsync(Guid marketId);
    Task<Market> GetMarketAsync(Guid idmarketId);
    Task UpdateMarketAsync(Market market);
    Task<List<Market>> GetAllMarketsAsync();
    Task DeleteAllPhonesAsync(Guid marketId);
    Task RenameMarketAsync(string newName, Guid marketId);
    Task CreatePhoneAsync(Phone phone, Guid marketId);
    Task DeletePhonesAsync(Guid marketId, Guid phoneId);
    Task UpdatePhoneAsync(Phone phone, Guid marketId);
}
