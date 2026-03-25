using MediatR;
using GiulioCardillo.Exercise1.QueryAbstract;
using GiulioCardillo.Exercise1.Domain;

namespace GiulioCardillo.Exercise1.Query;

public class GetListMarketHandler(IMarketService marketService) : IRequestHandler<GetAllMarket, List<Market>>
{
    async Task<List<Market>> IRequestHandler<GetAllMarket, List<Market>>.Handle(GetAllMarket request, CancellationToken cancellationToken)
    {
        var allMarkets = await marketService.GetAllMarketsAsync();
        return allMarkets;
    }
}
