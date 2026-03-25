namespace Esercizi
{
    public interface IInterfaceMethodsForRectagle
    {
        public List<Rettangolo> AggiungiAllaListaUnRettangolo(List<Rettangolo> rettangolos, Rettangolo rettangolo);
        public Array TransformToArrayList(List<Rettangolo> rettangolos, Rettangolo rettangolo);
        public Rettangolo CreazioneRettangolo(int width, int height);
    }
}
