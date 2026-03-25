using GiulioCardillo.Exercise1.CommandAbstract;
using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.Command;

public class UpdateMarketHandler(IMarketService marketService) : IRequestHandler<UpdateMarket>
{
    public async Task Handle(UpdateMarket request, CancellationToken cancellationToken)
    {
        var market = new Market
        { Name = request.Market.Name, Phones = request.Market.Phones, MarketId = request.Market.MarketId };
        await marketService.UpdateMarketAsync(market);
    }
}
