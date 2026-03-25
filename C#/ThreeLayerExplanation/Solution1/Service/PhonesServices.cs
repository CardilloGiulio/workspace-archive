using Persistence;

namespace Service
{
    public class PhonesServices(IPhonesRepository phonesRepository) : IPhonesServices
    {
        public void CreatePhone(Phone phone)
        {
            if (phone == null)
                return;
            phonesRepository.CreatePhone(phone);
        }

        public void DeletePhone(Guid id)
        {
            phonesRepository.DeletePhone(id);
        }

        public List<Phone> GetAllPhones()
        {
            return phonesRepository.GetAllPhones();
        }

        public Phone? GetPhone(Guid id)
        {
            return phonesRepository.GetPhone(id);
        }

        public void PatchPhone(Phone phone)
        {
            if (phone != null)
                phonesRepository.PatchPhone(phone);
            return;
        }

        public void PutPhone(Phone phone)
        {
            if (phone != null)
                phonesRepository.PutPhone(phone);
            return;
        }
    }
}
