using GiulioCardillo.Exercise1.CommandAbstract;
using GiulioCardillo.Exercise1.Domain;
using GiulioCardillo.Exercise1.QueryAbstract;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace GiulioCardillo.Exercize1.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarketController(IMediator mediator) : Controller
    {
        [HttpPost]
        public async Task CreateMarketAsync([FromBody] CreateMarket createMarket)
        {
            await mediator.Send(createMarket);
        }

        [HttpPut("{id}")]
        public async Task UpdateMarkerAsync([FromBody] Market market)
        {
            var updateMarket = new UpdateMarket { Market = market };
            await mediator.Send(updateMarket);
        }

        [HttpDelete("{marketId}")]
        public async Task DestroyMarketAsync(Guid marketId)
        {
            var removeMarket = new DeleteMarket { MarketId = marketId };
            await mediator.Send(removeMarket);
        }

        [HttpGet("{id}")]
        public async Task<Market> FindByGuidMarketAsync(Guid id)
        {
            return await mediator.Send(new GetMarket { MarketId = id });
        }
        [HttpGet]
        public async Task<List<Market>> ReportStatusAllMarketsAsync()
        {
            return await mediator.Send(new GetAllMarket { });
        }
    }
}
