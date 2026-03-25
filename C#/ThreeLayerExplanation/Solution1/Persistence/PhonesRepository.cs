namespace Persistence
{
    public class PhonesRepository : IPhonesRepository
    {
        private readonly List<Phone> phones = [];

        public void CreatePhone(Phone phone)
        {
            phones.Add(phone);
        }

        public void PutPhone(Phone phone)
        {
            var foundPhone = phones.FirstOrDefault(p => p.Id == phone.Id);
            if (foundPhone != null)
            {
                phones.Remove(foundPhone);
                phones.Add(phone);
            }
        }

        public void DeletePhone(Guid id)
        {
            var foundPhone = phones.FirstOrDefault(p => p.Id == id);
            if (foundPhone != null)
                phones.Remove(foundPhone);
        }

        public void PatchPhone(Phone phone)
        {
            var foundPhone = phones.FirstOrDefault(p => p.Id == phone.Id);
            if (foundPhone != null)
            {
                foundPhone.PhoneNumber = phone.PhoneNumber;
                foundPhone.Battery = phone.Battery;
                foundPhone.Status = phone.Status;
                foundPhone.TypeModel = phone.TypeModel;
            }
        }

        public Phone? GetPhone(Guid id)
        {
            return phones.FirstOrDefault(p => p.Id == id);
        }

        public List<Phone> GetAllPhones()
        {
            return phones;
        }
    }
}
