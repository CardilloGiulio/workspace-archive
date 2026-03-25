using MediatR;

namespace GiulioCardillo.Exercise1.CommandAbstract;

public class DeleteMarket : IRequest
{
    public Guid MarketId { get; set; }
}
