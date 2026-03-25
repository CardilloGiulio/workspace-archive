using Esercizi;

namespace ConsoleEsercizi
{
    public class Program : IInterfaceMethodsForRectagle
    {
        static void Main(string[] args)
        {
            var methods = new Program();

            Console.WriteLine("Insert width and height for your rectangle");

            Console.Write("Width: ");
            int width;
            while (!int.TryParse(Console.ReadLine(), out width))
            {
                Console.Write("Invalid number, try again: ");
            }

            Console.Write("Height: ");
            int height;
            while (!int.TryParse(Console.ReadLine(), out height))
            {
                Console.Write("Invalid number, try again: ");
            }

            Rettangolo rettangolo = methods.CreazioneRettangolo(width, height);
            Console.WriteLine(rettangolo.Width);
            Console.WriteLine(rettangolo.Height);
        }



        public List<Rettangolo> AggiungiAllaListaUnRettangolo(List<Rettangolo> rettangolos, Rettangolo rettangolo)
        {
            rettangolos.Add(rettangolo);
            return rettangolos;
        }

        public Rettangolo CreazioneRettangolo(int width, int height)
        {
            Rettangolo rettangolo = new Rettangolo(width, height);
            return rettangolo;
        }

        public Array TransformToArrayList(List<Rettangolo> rettangolos, Rettangolo rettangolo)
        {
            throw new NotImplementedException();
        }
    }
}
