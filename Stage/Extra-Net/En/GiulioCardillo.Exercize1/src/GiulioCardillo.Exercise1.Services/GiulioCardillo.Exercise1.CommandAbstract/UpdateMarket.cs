using GiulioCardillo.Exercise1.Domain;
using MediatR;

namespace GiulioCardillo.Exercise1.CommandAbstract;

public class UpdateMarket : IRequest
{
    public Market Market { get; set; }
}

