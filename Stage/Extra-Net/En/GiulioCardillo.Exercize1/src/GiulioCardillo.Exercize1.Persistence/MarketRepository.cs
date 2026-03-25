using GiulioCardillo.Exercise1.Domain;
using Microsoft.EntityFrameworkCore;

namespace GiulioCardillo.Exercize1.Persistence
{
    public class MarketRepository(MyDbContext dbContext) : IMarketRepository
    {
        public async Task CreateMarketAsyncRep(Market market)
        {
            dbContext.Markets.Add(market);

            await dbContext.SaveChangesAsync();
        }
        public async Task DeleteMarketAsyncRep(Guid id)
        {
            var toDeleteMarket = dbContext.Markets.FirstOrDefault(p => p.MarketId == id);
            dbContext.Markets.Remove(toDeleteMarket);

            await dbContext.SaveChangesAsync();
        }
        public async Task UpdateMarketAsyncRep(Market newMarket)
        {
            var foundMarket =  dbContext.Markets
                .FirstOrDefault(p => p.MarketId == newMarket.MarketId) ??
                throw new Exception("Market not found");

			foundMarket.Name = newMarket.Name;

            await dbContext.SaveChangesAsync();
        }
        public async Task<Market> GetMarketAsyncRep(Guid id)
        {
            var market = await dbContext.Markets.Include(p => p.Phones).FirstAsync(p => p.MarketId == id);
            return market;
        }
        public Task<List<Market>> GetAllMarketsAsyncRep()
        {
            return dbContext.Markets.Include(p => p.Phones).ToListAsync();
        }
        public async Task DeletePhonesAsyncRep(Guid id)
        {
            var market = dbContext.Markets.Include(p => p.Phones).First(p => p.MarketId == id);
            foreach (var phone in market.Phones)
            {
                dbContext.Remove(phone);
            }
            market.Phones.Clear();

            await dbContext.SaveChangesAsync();
        }
        public async Task RenameMarketAsyncRep(string newName, Guid id)
        {
            var oldmarket = dbContext.Markets.Include(p => p.Phones).First(p => p.MarketId == id);
            oldmarket.Name = newName;

            await dbContext.SaveChangesAsync();
        }
        public async Task CreatePhoneAsyncRep(Phone phone, Guid id)
        {
            var oldmarket = dbContext.Markets.Include(p => p.Phones).FirstOrDefault(p => p.MarketId == id);
            oldmarket.Phones.Add(phone);

            await dbContext.SaveChangesAsync();
        }
        public async Task DeletePhoneAsyncRep(Guid marketId, Guid phoneId)
        {
            var oldmarket = await GetMarketAsyncRep(marketId);
            var phone = oldmarket.Phones.FirstOrDefault(p => p.PhoneId == phoneId);
            oldmarket.Phones.Remove(phone);
            dbContext.Remove(phone);

            await dbContext.SaveChangesAsync();
        }
        public async Task UpdatePhoneAsyncRep(Phone phone, Guid marketId)
        {
            var oldmarket = dbContext.Markets.Include(p => p.Phones).First(p => p.MarketId == marketId);
            var oldphone = oldmarket.Phones.FirstOrDefault(p => p.PhoneId == phone.PhoneId);

            oldphone.Screen = phone.Screen;
            oldphone.Battery = phone.Battery;
            oldphone.Camera = phone.Camera;

            await dbContext.SaveChangesAsync();
        }
    }
}
