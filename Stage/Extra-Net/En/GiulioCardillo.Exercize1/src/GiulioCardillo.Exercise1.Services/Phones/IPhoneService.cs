namespace GiulioCardillo.Exercise1.Phones;

public interface IPhoneService
{
    Phone GetPhoneById(Guid phoneId, Guid marketId);
    List<Phone> GetAllPhones();
}
