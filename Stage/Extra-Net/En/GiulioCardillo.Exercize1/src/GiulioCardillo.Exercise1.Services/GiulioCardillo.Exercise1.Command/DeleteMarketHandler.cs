using GiulioCardillo.Exercise1.CommandAbstract;
using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.Command;

public class DeleteMarketHandler(IMarketService marketService) : IRequestHandler<DeleteMarket>
{
    public async Task Handle(DeleteMarket request, CancellationToken cancellationToken)
    {
        await marketService.DeleteMarketAsync(request.MarketId);
    }
}
