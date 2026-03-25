namespace GiulioCardillo.Exercise1.Domain;

public class Market
{
    public Guid MarketId { get; set; }
    public required string Name { get; set; }
    public required List<Phone> Phones { get; set; } = [];
}