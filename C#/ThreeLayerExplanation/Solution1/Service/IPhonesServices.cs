using Persistence;

namespace Service
{
    public interface IPhonesServices
    {
        public void CreatePhone(Phone phone);
        public void PutPhone(Phone phone);
        public void DeletePhone(Guid id);
        public void PatchPhone(Phone phone);
        public Phone? GetPhone(Guid id);
        public List<Phone> GetAllPhones();
    }
}
