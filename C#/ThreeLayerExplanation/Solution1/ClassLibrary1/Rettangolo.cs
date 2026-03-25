namespace Esercizi
{
    public class Rettangolo
    {
        public int Width { get; set; }
        public int Height { get; set; }
        public int Area => Width * Height;
        public Rettangolo(int width, int height)
        {
            Width = width;
            Height = height;
        }
    }
}
