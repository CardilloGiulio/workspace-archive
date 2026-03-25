using MediatR;
using GiulioCardillo.Exercise1.CommandAbstract;
using GiulioCardillo.Exercise1.Domain;

namespace GiulioCardillo.Exercise1.Command
{
    public class UpdatePhoneHandler(IMarketService marketService) : IRequestHandler<UpdatePhone>
    {
        public async Task Handle(UpdatePhone request, CancellationToken cancellationToken)
        {
            await marketService.UpdatePhoneAsync(request.Phone, request.MarketId);
        }
    }
}
