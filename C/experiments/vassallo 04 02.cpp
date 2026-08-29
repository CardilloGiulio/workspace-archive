#include <stdio.h>
main ()

{
    const int intero = 35;
    const int ridotto = 25;
    const int VIP = 60;

    int reparto;
    int buget;
    int xquanto;
    int accessi;

    char fare;
    int a = 1;
    int x = 0;
    int i;

	while (a>x)
	{
	    printf("scegli? ");
        printf(" 0-esci da programma /n 1-esci dal programma %n 2-simula gli acquisti successivi scelti dal utente %n 3-controlla la disponibilita accessi giorni per fasce orarie ");
        scanf("%d", &reparto);
        switch (reparto)
        {
            case 1: //punto 1
            printf("scegli? ");
            printf(" A-intero%n B-ridotto(under 18/ studenti) %n C-vip(salta fila) %n");
            scanf("%d", &fare);
            switch (fare);
            {
                case A:
                case a:
                	for (i=0;i<10;i++)
                	{
                	    printf("giorno- %d  e spesa- %d", i+1 , intero*(i+1));	
                	}
                break;
                case B:  
		    	case b:
		    		for (i=0;i<10;i++)
                	{
                	    printf("giorno- %d  e spesa- %d" , i+1, ridotto*(i+1));	
                	}
                break;
                case C:  
		    	case c:
		    		for (i=0;i<10;i++)
                	{
                	    printf("giorno- %d  e spesa- %d", i+1 , VIP*(i+1));	
                	}
                break;
                default:
                printf("IL MESSAGGIO NON è VALIDO SI PREGA DI RITENTARE ");
                break;
            }

            break;
            case 2://punto2
    	    printf("qual'è il baget massimo'");
    	    scanf("%d", &buget);
    	    if( buget>0)
    	    {
    	    	int totspeso=0
    	    	while (totspeso<buget) 
    	    	printf("scegli? ");
                printf(" A-intero%n B-ridotto(under 18/ studenti) %n C-vip(salta fila) %n");
                scanf("%d", &fare);
                 switch (fare)
                {
                    case A:
                    case a:
                        printf("quante ne vuole acquistare");
                        scanf("%d", &xquanto);
                    	printf("prezzo acquisto %d"intero*xquanto);
                    	buget=budget+intero*xquanto;	
                    break;
           
                    case B:  
		        	case b:
		        		printf("quante ne vuole acquistare");
                        scanf("%d", &xquanto);
                    	printf("prezzo acquisto %d"ridotto*xquanto);
		    	    	buget=budget+ridotto*xquanto;
                    break;
                
                    case C:  
		        	case c:
		        		printf("quante ne vuole acquistare");
                        scanf("%d", &xquanto);
                    	printf("prezzo acquisto %d"VIP*xquanto);
		    	    	buget=budget+VIP*xquanto;
                    break;
                
                    default:
                    printf("IL indicazione/valore NON è VALIDO SI PREGA DI RITENTARE ");
                    break;
                }
    	    }
    	    else
    	    {
    	    	printf("mi dispiace ma nn è valido");
    	    	break;
    	    }
    	    break;
    	    
    	    case 3://punto3
    	    {
			    for(i=0;i<10;i++)
			    {
			    	printf("GIORNO 1");
			    	for(z=0;z<10;z++)
			    	{
			    		
			    		printf("quanti accessi disponibili ?");	
			    		scanf("%d", &accessi);
			    		if(accessi>-2)
			    		{
			    			continue
			    			break;
						}
						else (accessi<-2)
						{
							printf("ERRORE");
							break;
						}
						else if (accessi=-1)
						{
							printf("PROBLEMA GRAVE EVAQUAZIONE PARCO CHIUSURA ATRAZIONI");
							break;
						}
					}
				}
			}
    	     
        	default:
        		printf("arrivederci :)");
                continue
                    return 0;
                
        }
    }
}


