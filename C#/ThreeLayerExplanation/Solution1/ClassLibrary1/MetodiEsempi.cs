namespace Esercizi
{
    public class MetodiEsempi
    {
        public static int CalcoloSemplice(int a, int b)
        {
            int c = a+b;
            return c;
        }
        public static Rettangolo CreazioneRettangolo(int a, int b)
        {
            var newRettangle = new Rettangolo(a,b);
            return newRettangle;
        }
    }
}
