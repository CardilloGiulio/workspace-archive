using MediatR;
using GiulioCardillo.Exercise1.Domain;

namespace GiulioCardillo.Exercise1.CommandAbstract
{
    public class UpdatePhone : IRequest
    {
        public Guid MarketId;
        public Phone Phone;
    }
}
