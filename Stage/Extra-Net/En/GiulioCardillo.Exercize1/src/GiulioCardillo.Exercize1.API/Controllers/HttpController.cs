using GiulioCardillo.Exercise1.CommandAbstract;
using GiulioCardillo.Exercise1.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GiulioCardillo.Exercize1.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HttpController(IMediator mediator) : ControllerBase
    {
        [HttpDelete("/DeleteAllPhones")]
        public async Task RemoveAllPhones(Guid marketId)
        {
            var deletePhones = new DeletePhones { MarketId = marketId };
            await mediator.Send(deletePhones);
        }

        [HttpPut("/RenameMarket")]
        public async Task RenameMarket(Guid marketId, string newName)
        {
            var nameMarket = new RenameMarket { MarketId = marketId, NewName = newName };
            await mediator.Send(nameMarket);
        }

        [HttpPost("/AddPhoneToMarket")]
        public async Task AddNewPhone([FromBody] Phone phone, Guid marketId)
        {
            var newPhone = new NewPhone { MarketId = marketId, Phone = phone };
            await mediator.Send(newPhone);
        }

        [HttpDelete("/RemovePhone")]
        public async Task RemovePhones(Guid marketId)
        {
            var removePhone = new DeletePhones { MarketId = marketId };
            await mediator.Send(removePhone);
        }

        [HttpPut("/ModifyPhone")]
        public async Task ModifyPhone([FromBody] Phone phone, Guid marketId)
        {
            var edit = new UpdatePhone { MarketId = marketId, Phone = phone };
            await mediator.Send(edit);
        }
    }
}

