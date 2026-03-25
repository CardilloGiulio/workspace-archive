namespace GiulioCardillo.Exercise1.Phones;

public class PhoneService(IPhoneRepository phoneRepository) : IPhoneService
{
    public Phone GetPhoneById(Guid phoneId, Guid marketId)
    {
        var allPhone = GetAllPhones();
        var searchedId = allPhone.Any(phone => phone.PhoneId == phoneId);
        if (searchedId == false)
            throw new Exception("You tried give a null Id, please insert a valid one");

        return phoneRepository.GetPhoneById(phoneId, marketId);
    }
    public List<Phone> GetAllPhones()
    {
        if (phoneRepository.GetAllPhones() == null)
            throw new Exception("No phone aviable");

        return phoneRepository.GetAllPhones();
    }
}