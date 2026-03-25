namespace GestioniLibri
{
    public interface ILibroService
    {
        public void AddLibro(Libro libro);
        public void RemoveLibro(int Id);
        public Libro GetLibro(int Id);
        public List<Libro> GetAllLibro();
        public int GetId();
        public string GetTitle();
        public string GetAuthor();
        public DateTime GetPublication();
    }
}
