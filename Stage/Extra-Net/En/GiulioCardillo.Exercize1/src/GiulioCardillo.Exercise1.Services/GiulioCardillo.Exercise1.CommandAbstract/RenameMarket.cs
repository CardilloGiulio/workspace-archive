using MediatR;

namespace GiulioCardillo.Exercise1.CommandAbstract
{
    public class RenameMarket : IRequest
    {
        public string NewName;
        public Guid MarketId;
    }
}
