using GiulioCardillo.Exercise1.CommandAbstract;
using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.Command
{
    public class NewPhoneHandler(IMarketService marketService) : IRequestHandler<NewPhone>
    {
        public async Task Handle(NewPhone request, CancellationToken cancellationToken)
        {
            await marketService.CreatePhoneAsync(request.Phone, request.MarketId);
        }
    }
}
