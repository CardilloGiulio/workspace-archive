using MediatR;

namespace GiulioCardillo.Exercise1.CommandAbstract
{
    public class DeletePhone : IRequest
    {
        public Guid MarketId;
        public Guid PhoneId;
    }
}
