

namespace GestioniLibri
{
    public class LibroService : ILibroService
    {
        private List<Libro> listOfLibri = [];
        public void AddLibro(Libro libro)
        {
            listOfLibri.Add(libro);
        }

        public List<Libro> GetAllLibro()
        {
            return listOfLibri;
        }

        public Libro GetLibro(int id)
        {
            var libroTrovato = listOfLibri.FirstOrDefault(l => l.Id == id);
            return libroTrovato;
        }

        public void RemoveLibro(int id)
        {
            var libroTrovato = listOfLibri.FirstOrDefault(l => l.Id == id);
            listOfLibri.Remove(libroTrovato);
        }
        public string GetTitle()
        {
            Console.WriteLine("Insert Title: ");
            string title = Console.ReadLine();
            return title;
        }
        public string GetAuthor()
        {
            Console.WriteLine("Insert Author: ");
            string author = Console.ReadLine();
            return author;
        }

        public int GetId()
        {
            Console.WriteLine("Insert Id: ");
            int id = int.Parse(Console.ReadLine());
            return id;
        }

        public DateTime GetPublication()
        {
            DateTime publication = DateTime.Now;
            return publication;
        }
    }
}
