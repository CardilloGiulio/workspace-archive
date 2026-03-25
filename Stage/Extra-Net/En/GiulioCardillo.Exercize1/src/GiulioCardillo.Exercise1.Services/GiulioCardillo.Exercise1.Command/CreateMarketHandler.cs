using GiulioCardillo.Exercise1.CommandAbstract;
using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.Command
{
    public class CreateMarketHandler(IMarketService marketService) : IRequestHandler<CreateMarket>
    {
        public async Task Handle(CreateMarket request, CancellationToken cancellationToken)
        {
            var market = new Market
            { Name = request.Name, Phones = request.Phones, MarketId = request.MarketId };
            await marketService.CreateMarketAsync(market);
        }
    }
}
