using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.CommandAbstract;

public class CreateMarket : IRequest
{
    public Guid MarketId { get; set; }
    public required string Name { get; set; }
    public required List<Phone> Phones { get; set; } = [];
}