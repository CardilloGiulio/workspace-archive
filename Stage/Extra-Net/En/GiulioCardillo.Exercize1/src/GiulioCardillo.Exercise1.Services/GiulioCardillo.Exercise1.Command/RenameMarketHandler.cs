using GiulioCardillo.Exercise1.CommandAbstract;
using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.Command
{
    public class RenameMarketHandler(IMarketService marketService) : IRequestHandler<RenameMarket>
    {
        public async Task Handle(RenameMarket request, CancellationToken cancellationToken)
        {
            await marketService.RenameMarketAsync(request.NewName, request.MarketId);
        }
    }
}
