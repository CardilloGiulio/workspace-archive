using MediatR;
using GiulioCardillo.Exercise1.Domain;

namespace GiulioCardillo.Exercise1.CommandAbstract
{
    public class NewPhone : IRequest
    {
        public Guid MarketId;
        public required Phone Phone;
    }
}
