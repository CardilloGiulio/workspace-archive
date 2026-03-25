namespace GiulioCardillo.Exercise1.Domain;

public interface IPhoneService
{
    Phone GetPhone(Guid phoneId, Guid marketId);
    List<Phone> GetAllPhones();
}
