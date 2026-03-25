namespace GiulioCardillo.Exercise1.Domain;

public class MarketService(IMarketRepository marketRepository) : IMarketService
{
    public async Task CreateMarketAsync(Market market)
    {
        if (market == null)
            throw new Exception("You tried give a null Market, please insert a valid one");

        var marketExists = await CheckIfMarketExistsAsync(market.MarketId);
        if (marketExists == true)
            throw new Exception("You tried give a null id, please insert a valid one");

        await marketRepository.CreateMarketAsyncRep(market);
    }

    public async Task<bool> CheckIfMarketExistsAsync(Guid marketId)
    {
        var allMarkets = await GetAllMarketsAsync();
        var marketExists = allMarkets.Any(market => market.MarketId == marketId);
        return marketExists;
    }

    public async Task DeleteMarketAsync(Guid marketId)
    {
        var marketExists = await CheckIfMarketExistsAsync(marketId);
        if (marketExists == false)
            throw new Exception("You tried give a null id, please insert a valid one");

        await DeleteAllPhonesAsync(marketId);

        await marketRepository.DeleteMarketAsyncRep(marketId);
    }

    public async Task UpdateMarketAsync(Market market)
    {
        if (market == null)
            throw new Exception("You tried give a null Market, please insert a valid one");

        var marketExists = await CheckIfMarketExistsAsync(market.MarketId);
        if (marketExists == false)
            throw new Exception("You tried give a null id, please insert a valid one");

        var marketWithOldList = await GetMarketAsync(market.MarketId);
        var phonesInNewList = market.Phones;

        var phonesToRemove = new List<Phone>();
        var phonesToAdd = new List<Phone>();
        var phonesToUpdate = new List<Phone>();

        foreach (var phone in marketWithOldList.Phones)
        {
            var newPhone = phonesInNewList.FirstOrDefault(p => p.PhoneId == phone.PhoneId);

            if (newPhone != null)
                phonesToUpdate.Add(newPhone);
            else
                phonesToRemove.Add(phone);
        }

        foreach (var phone in phonesInNewList)
        {
            if (!marketWithOldList.Phones.Any(p => p.PhoneId == phone.PhoneId))
                phonesToAdd.Add(phone);
        }

        foreach (var phone in phonesToAdd)
        {
            await marketRepository.CreatePhoneAsyncRep(phone, market.MarketId);
        }

        foreach (var phone in phonesToRemove)
        {
            await marketRepository.DeletePhoneAsyncRep(market.MarketId, phone.PhoneId);
        }

        foreach (var phone in phonesToUpdate)
        {
            await marketRepository.UpdatePhoneAsyncRep(phone, market.MarketId);
        }

        await marketRepository.UpdateMarketAsyncRep(market);
    }

    public async Task<Market> GetMarketAsync(Guid id)
    {
        var allMarket = await GetAllMarketsAsync();
        var searchedId = allMarket.Any(market => market.MarketId == id);
        var marketExists = await CheckIfMarketExistsAsync(id);
        if (marketExists == false)
            throw new Exception("You tried give a null id, please insert a valid one");

        return await marketRepository.GetMarketAsyncRep(id);
    }

    public Task<List<Market>> GetAllMarketsAsync()
    {
        var allMarkets = marketRepository.GetAllMarketsAsyncRep();
        if (allMarkets == null)
            throw new Exception("No market aviable");

        return allMarkets;
    }

    public async Task DeleteAllPhonesAsync(Guid marketId)
    {
        await marketRepository.DeletePhonesAsyncRep(marketId);
    }

    public async Task RenameMarketAsync(string newName, Guid id)
    {
        if (newName == null)
            Console.WriteLine("Invalid parameters: name cannot be null.");

        var oldmarket = await marketRepository.GetMarketAsyncRep(id);
        var marketExists = await CheckIfMarketExistsAsync(id);
        if (marketExists == false)
            throw new Exception("You tried give a null id, please insert a valid one");

        await marketRepository.RenameMarketAsyncRep(newName, id);
    }

    public async Task CreatePhoneAsync(Phone phone, Guid id)
    {
        if (phone == null)
            Console.WriteLine("Invalid parameters: Phone cannot be null.");

        await marketRepository.CreatePhoneAsyncRep(phone, id);

    }

    public async Task DeletePhonesAsync(Guid marketId, Guid phoneId)
    {
        var oldmarket = await marketRepository.GetMarketAsyncRep(marketId);
        var oldphone = oldmarket.Phones.FirstOrDefault(p => p.PhoneId == phoneId);
        if (oldphone == null)
            throw new Exception("Phone not found in the market.");

        await marketRepository.DeletePhoneAsyncRep(marketId, phoneId);
    }

    public async Task UpdatePhoneAsync(Phone phone, Guid marketId)
    {
        if (phone == null)
            throw new Exception("Invalid parameters: Phone cannot be null and Market ID cannot be zero.");

        var oldmarket = await marketRepository.GetMarketAsyncRep(marketId);
        var oldphone = oldmarket.Phones.FirstOrDefault(p => p.PhoneId == phone.PhoneId);
        if (oldphone == null)
            throw new Exception("Phone not found in the market.");

        await marketRepository.UpdatePhoneAsyncRep(phone, marketId);
    }
}