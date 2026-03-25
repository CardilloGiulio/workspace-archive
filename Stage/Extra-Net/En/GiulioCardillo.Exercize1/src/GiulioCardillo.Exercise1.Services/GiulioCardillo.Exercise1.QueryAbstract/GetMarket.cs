using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.QueryAbstract;

public class GetMarket : IRequest<Market>
{
    public Guid MarketId { get; set; }
}
