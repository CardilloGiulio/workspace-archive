using MediatR;

namespace GiulioCardillo.Exercise1.CommandAbstract
{
    public class DeletePhones : IRequest
    {
        public Guid MarketId;
    }
}
