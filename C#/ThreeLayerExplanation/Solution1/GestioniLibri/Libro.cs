namespace GestioniLibri
{
    public class Libro
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime Publication { get; set; }
        public Libro(int id, string title, string author, DateTime publication)
        {
            Id = id;
            Title = title;
            Author = author;
            Publication = publication;
        }
    }
}
