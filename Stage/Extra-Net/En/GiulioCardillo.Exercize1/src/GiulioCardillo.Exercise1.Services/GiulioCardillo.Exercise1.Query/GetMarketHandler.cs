using GiulioCardillo.Exercise1.Domain;
using GiulioCardillo.Exercise1.QueryAbstract;
using MediatR;

namespace GiulioCardillo.Exercise1.Query;

public class GetMarketHandler(IMarketService marketService) : IRequestHandler<GetMarket, Market>
{
    async Task<Market> IRequestHandler<GetMarket, Market>.Handle(GetMarket request, CancellationToken cancellationToken)
    {
        var market = await marketService.GetMarketAsync(request.MarketId);
        return market;
    }
}
