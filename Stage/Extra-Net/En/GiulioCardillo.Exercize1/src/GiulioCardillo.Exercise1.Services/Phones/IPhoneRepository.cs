namespace GiulioCardillo.Exercise1.Phones;

public interface IPhoneRepository
{
    Phone GetPhoneById(Guid id, Guid marketId);
    List<Phone> GetAllPhones();
}