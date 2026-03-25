using GiulioCardillo.Exercise1.CommandAbstract;
using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.Command
{
    public class DeletePhonesHandler(IMarketService marketService) : IRequestHandler<DeletePhones>
    {
        public async Task Handle(DeletePhones request, CancellationToken cancellationToken)
        {
            await marketService.DeleteAllPhonesAsync(request.MarketId);
        }
    }
}
