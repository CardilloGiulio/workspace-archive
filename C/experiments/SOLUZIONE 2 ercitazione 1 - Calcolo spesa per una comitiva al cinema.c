#include <stdio.h>

/* funzione che calcola il costo finale */
float calcolaCostoFinale(int persone, float prezzoBiglietto)
{
    float costoTotale;
    float sconto;

    costoTotale = persone * prezzoBiglietto;

    if (persone >= 5)
    {
        sconto = persone * 2;
    }
    else
    {
        sconto = 0;
    }

    return costoTotale - sconto;
}

/* funzione che controlla se il budget è sufficiente */
int controllaBudget(float budget, float costoFinale)
{
    if (budget >= costoFinale)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

/* funzione che gestisce l'elaborazione principale */
void gestisciCinema(int persone, float prezzoBiglietto, float budget)
{
    float costoFinale;
    int esito;

    costoFinale = calcolaCostoFinale(persone, prezzoBiglietto);
    esito = controllaBudget(budget, costoFinale);

    printf("\nCosto finale: %.2f euro\n", costoFinale);

    if (esito == 1)
    {
        printf("Budget sufficiente\n");
    }
    else
    {
        printf("Budget insufficiente\n");
    }
}

int main()
{
    int persone;
    float prezzoBiglietto;
    float budget;

    printf("Numero persone: ");
    scanf("%d", &persone);

    printf("Prezzo di un biglietto: ");
    scanf("%f", &prezzoBiglietto);

    printf("Budget totale: ");
    scanf("%f", &budget);

    gestisciCinema(persone, prezzoBiglietto, budget);

    return 0;
}
