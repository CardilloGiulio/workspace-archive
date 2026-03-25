namespace Esercizi
{
    public class ListAndArray(List<Rettangolo> listaDiRettangoli, Array arrayDiRettangoli) : IInterfaceMethodsForRectagle
    {
        public required List<Rettangolo> ListaDiRettangoli { get; set; } = listaDiRettangoli;
        public required Array ArrayDiRettangoli { get; set; } = arrayDiRettangoli;

        public List<Rettangolo> AggiungiAllaListaUnRettangolo(List<Rettangolo> rettangolos, Rettangolo rettangolo)
        {
            rettangolos.Add(rettangolo);
            return rettangolos;
        }
        public Array TransformToArrayList(List<Rettangolo> rettangolos, Rettangolo rettangolo)
        {
            Rettangolo[] array = rettangolos.ToArray();
            return array;
        }
        public Rettangolo CreazioneRettangolo(int width, int height)
        {
            var newRettangle = new Rettangolo(width, height);
            return newRettangle;
        }
    }
}
