namespace GiulioCardillo.Exercise1.Domain;

public interface IPhoneRepository
{
    Phone GetPhoneRep(Guid id, Guid marketId);
    List<Phone> GetAllPhonesRep();
}