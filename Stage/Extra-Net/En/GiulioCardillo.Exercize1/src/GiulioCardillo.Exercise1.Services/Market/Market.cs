using GiulioCardillo.Exercise1.Phones;

namespace GiulioCardillo.Exercise1.Markets;

public class Market
{
    public Guid MarketId { get; set; }
    public required string Name { get; set; }
    public required List<Phone> Phones { get; set; } = [];
}