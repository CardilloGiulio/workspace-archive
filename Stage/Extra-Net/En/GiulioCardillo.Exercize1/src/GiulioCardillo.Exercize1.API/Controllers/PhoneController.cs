using GiulioCardillo.Exercise1.Domain;
using Microsoft.AspNetCore.Mvc;
namespace GiulioCardillo.Exercize1.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhoneController(IPhoneService phoneService) : ControllerBase
    {
        [HttpGet("{phoneId}")]
        public Phone GetPhoneById(Guid phoneId, Guid marketId)
        {
            return phoneService.GetPhone(phoneId, marketId);
        }

        [HttpGet]
        public List<Phone> GetAllPhones()
        {
            return phoneService.GetAllPhones();
        }
    }
}
