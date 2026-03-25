using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.QueryAbstract;

public class GetAllMarket : IRequest<List<Market>>
{
}
