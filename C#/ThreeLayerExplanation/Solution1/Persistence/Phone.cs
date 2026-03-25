namespace Persistence
{
    public class Phone
    {
        public int Battery { get; set; }
        public required string PhoneNumber { get; set; }
        public int Status { get; set; }
        public required string TypeModel { get; set; }
        public Guid Id { get; set; }

        public Phone(int battery, string phoneNumber, int status, string typeModel)
        {
            Battery = battery;
            PhoneNumber = phoneNumber;
            Status = status;
            TypeModel = typeModel;
            Id = new Guid();
        }
    }
}