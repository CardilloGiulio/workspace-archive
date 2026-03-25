using GestioniLibri;

namespace ConsoleLibri
{
    public class Program
    {
        static void Main(string[] args)
        {
            LibroService service = new();
            for (int i = 0;  i < 5; i++)
            {
                var id = service.GetId();
                var title = service.GetTitle();
                var publication = service.GetPublication();
                var author = service.GetAuthor();
                var libro = new Libro(id, title, author, publication);
                service.AddLibro(libro);
            }
            var listLibri = service.GetAllLibro();
            foreach ( var libro in listLibri )
            {
                Console.WriteLine(libro.Id);
                Console.WriteLine(libro.Author);
                Console.WriteLine(libro.Title);
                Console.WriteLine(libro.Publication);
            }
            Console.WriteLine("Inserisci id del libro da rimuovere");
            var idToRemove = service.GetId();
            service.RemoveLibro(idToRemove);
            var updatedListLibri = service.GetAllLibro();
            foreach (var libro in listLibri)
            {
                Console.WriteLine(libro.Id);
                Console.WriteLine(libro.Author);
                Console.WriteLine(libro.Title);
                Console.WriteLine(libro.Publication);
            }
        }
    }
}
