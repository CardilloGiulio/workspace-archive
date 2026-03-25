
using GiulioCardillo.Exercise1.Phones;

namespace GiulioCardillo.Exercise1.Markets;

public interface IMarketRepository
{
    Task CreateMarketAsyncRep(Market market);
    Task DestroyMarketAsyncRep(Guid id);
    Task UpdateMarketAsyncRep(Market market);
    Task<Market> FindByAdressMarketAsyncRep(Guid id);
    Task<List<Market>> ReportStatusAllMarketsAsyncRep();
    Task RemoveAllPhonesAsyncRep(Guid id);
    Task RenameMarketAsyncRep(string newName, Guid id);
    Task AddNewPhoneAsyncRep(Phone phone, Guid id);
    Task RemovePhonesAsyncRep(Guid marketId, Guid phoneId);
    Task ModifyPhoneAsyncRep(Phone phone, Guid marketId);
}
