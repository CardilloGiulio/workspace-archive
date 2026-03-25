using GiulioCardillo.Exercise1.Phones;

namespace GiulioCardillo.Exercise1.Markets;

public interface IMarketService
{
    Task CreateMarketAsync(Market market);
    Task<bool> CheckIfMarketExistsAsync(Guid marketId);
    Task DestroyMarketAsync(Guid marketId);
    Task<Market> FindByIdMarketAsync(Guid idmarketId);
    Task UpdateMarketAsync(Market market);
    Task<List<Market>> GetAllMarketsAsync();
    Task RemoveAllPhonesAsync(Guid marketId);
    Task RenameMarketAsync(string newName, Guid marketId);
    Task AddNewPhoneAsync(Phone phone, Guid marketId);
    Task RemovePhonesAsync(Guid marketId, Guid phoneId);
    Task ModifyPhoneAsync(Phone phone, Guid marketId);
}
