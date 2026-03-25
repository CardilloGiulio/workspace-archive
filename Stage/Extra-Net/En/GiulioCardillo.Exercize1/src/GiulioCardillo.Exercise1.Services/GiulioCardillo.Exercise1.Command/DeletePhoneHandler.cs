using GiulioCardillo.Exercise1.CommandAbstract;
using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.Command
{
    public class DeletePhoneHandler(IMarketService marketService) : IRequestHandler<DeletePhone>
    {
        public async Task Handle(DeletePhone request, CancellationToken cancellationToken)
        {
            await marketService.DeletePhonesAsync(request.MarketId, request.PhoneId);
        }
    }
}