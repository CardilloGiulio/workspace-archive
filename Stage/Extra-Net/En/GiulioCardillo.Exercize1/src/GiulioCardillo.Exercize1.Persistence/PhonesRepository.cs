using GiulioCardillo.Exercise1.Domain;

namespace GiulioCardillo.Exercize1.Persistence;

public class PhonesRepository : IPhoneRepository
{
    private readonly MyDbContext dbContext;

    public PhonesRepository(MyDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    public Phone GetPhoneRep(Guid phoneId, Guid marketId)
    {
        var market = dbContext.Markets.First(p => p.MarketId == marketId);
        var phone = market.Phones.First(p => p.PhoneId == phoneId);
        if (phone == null)
        {
            throw new Exception("Phone not found.");
        }
        return phone;
    }
    public List<Phone> GetAllPhonesRep()
    {
        return dbContext.Markets
                        .SelectMany(market => market.Phones)
                        .ToList();
    }

}
