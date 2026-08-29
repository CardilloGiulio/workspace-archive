#include <stdio.h>
#include <stdlib.h> // Serve per system("cls") e la pulizia schermo

#define MAX 10

int main() {
    // 1. Popolamento statico dei codici
    int codici[MAX] = {101, 102, 103, 104, 105, 106, 107, 108, 109, 110};
    int punteggi[MAX] = {0}; // Inizializza tutti a 0
    char organizzatore[100];
    int scelta, i, j, temp;
    char conferma;

    // Visualizzazione manifestazione e input organizzatore
    printf("--- GARA SCOLASTICA DI CODING 2024 ---\n");
    printf("Inserire Nome e Cognome del docente organizzatore: ");
    scanf(" %[^\n]s", organizzatore); // Legge anche gli spazi

    do {
        // Menù principale
        printf("\n--- MENU DI GESTIONE ---\n");
        printf("1. Inserimento punteggi\n");
        printf("2. Visualizzazione completa (con giudizio)\n");
        printf("3. Statistiche (Max, Min, Media, Fascia 60+)\n");
        printf("4. Sostituzione punteggi sotto soglia\n");
        printf("5. Ricerca punteggio\n");
        printf("6. Classifica decrescente\n");
        printf("7. Conteggio fasce\n");
        printf("8. Uscita\n");
        printf("Scelta: ");
        scanf("%d", &scelta);

        switch(scelta) {
            case 1: // Inserimento
                for(i=0; i<MAX; i++) {
                    printf("Punteggio per partecipante %d: ", codici[i]);
                    scanf("%d", &punteggi[i]);
                }
                break;

            case 2: // Visualizzazione con Giudizio
                printf("\nCodice\tPunt.\tGiudizio\n");
                for(i=0; i<MAX; i++) {
                    printf("%d\t%d\t", codici[i], punteggi[i]);
                    if(punteggi[i] >= 90) printf("ORO\n");
                    else if(punteggi[i] >= 75) printf("ARGENTO\n");
                    else if(punteggi[i] >= 60) printf("BRONZO\n");
                    else printf("FUORI_CLASSIFICA\n");
                }
                break;

            case 3: { // Statistiche
                int max = punteggi[0], min = punteggi[0], somma = 0, sopra60 = 0;
                for(i=0; i<MAX; i++) {
                    if(punteggi[i] > max) max = punteggi[i];
                    if(punteggi[i] < min) min = punteggi[i];
                    somma += punteggi[i];
                    if(punteggi[i] >= 60) sopra60++;
                }
                printf("Max: %d, Min: %d, Media: %.2f\n", max, min, (float)somma/MAX);
                printf("Partecipanti con almeno 60 punti: %d\n", sopra60);
                break;
            }

            case 4: { // Sostituzione
                int soglia, nuovo;
                printf("Inserisci soglia: "); scanf("%d", &soglia);
                printf("Inserisci nuovo valore: "); scanf("%d", &nuovo);
                for(i=0; i<MAX; i++) {
                    if(punteggi[i] < soglia) punteggi[i] = nuovo;
                }
                break;
            }

            case 5: { // Ricerca
                int cerca, occorrenze = 0;
                printf("Punteggio da cercare: "); scanf("%d", &cerca);
                for(i=0; i<MAX; i++) {
                    if(punteggi[i] == cerca) {
                        printf("Trovato in codice: %d\n", codici[i]);
                        occorrenze++;
                    }
                }
                if(occorrenze == 0) printf("Punteggio non presente.\n");
                else printf("Totale occorrenze: %d\n", occorrenze);
                break;
            }

            case 6: // Ordinamento (Bubble Sort)
                for(i=0; i<MAX-1; i++) {
                    for(j=0; j<MAX-i-1; j++) {
                        if(punteggi[j] < punteggi[j+1]) {
                            // Scambia punteggio
                            temp = punteggi[j];
                            punteggi[j] = punteggi[j+1];
                            punteggi[j+1] = temp;
                            // Scambia anche il codice (fondamentale!)
                            temp = codici[j];
                            codici[j] = codici[j+1];
                            codici[j+1] = temp;
                        }
                    }
                }
                printf("Classifica aggiornata (Vedi punto 2).\n");
                break;

            case 7: { // Conteggio fasce
                int oro=0, arg=0, bro=0, fc=0;
                for(i=0; i<MAX; i++) {
                    if(punteggi[i] >= 90) oro++;
                    else if(punteggi[i] >= 75) arg++;
                    else if(punteggi[i] >= 60) bro++;
                    else fc++;
                }
                printf("ORO: %d, ARGENTO: %d, BRONZO: %d, FUORI: %d\n", oro, arg, bro, fc);
                break;
            }
        }

        if(scelta != 8) {
            printf("\nPremi C per continuare e pulire lo schermo: ");
            scanf(" %c", &conferma);
            if(conferma == 'C' || conferma == 'c') system("cls");
        }

    } while(scelta != 8);

    return 0;
}

