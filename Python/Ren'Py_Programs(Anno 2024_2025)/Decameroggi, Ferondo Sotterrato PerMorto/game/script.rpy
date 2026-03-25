### IMAGES ###
image bg_countryside = im.Scale("BGCountryside.png", 1920, 1080)
image bg_monastery_hall = im.Scale("BGMonasteryHall.png", 1920, 1080)
image bg_village_home = im.Scale("BGVillageHome.png", 1920, 1080)
image bg_tomb = im.Scale("BGTomb.png", 1920, 1080)

# Abbot images
image abbot_normal = im.Scale("Abbot_normal.png", 450, 890)
image abbot_smug = im.Scale("Abbot_smug.png", 480, 720)
image abbot_angel = im.Scale("Abbot_disguised.png", 480, 720)

# Monk images
image monk_normal = im.Scale("Monk_normal.png", 480, 720)

# Ferondo images
image ferondo_normal = im.Scale("Ferondo_normal.png", 480, 870)
image ferondo_confused = im.Scale("Ferondo_confused.png", 680, 920)

# Wife images
image wife_normal = im.Scale("Wife_normal.png", 480, 720)
image wife_conflicted = im.Scale("Wife_conflicted.png", 660, 900)

### MUSIC ###
define music_countryside = "audio/ambience_countryside.MP3"
define music_somber = "audio/somber_theme.MP3"
define music_suspense = "audio/suspense_theme.WAV"
define music_tense = "audio/tense_ambience.MP3"
define music_village = "audio/village_theme.MP3"
define music_resurrection = "audio/resurrection_sound.MP3"

### CHARACTERS ###
define narrator = Character("Narratore", color="#FFFFFF")
define abbot = Character("Abate", color="#FFD700")
define ferondo = Character("Ferondo", color="#FFC0CB")
define wife = Character("Moglie di Ferondo", color="#FF69B4")
define monk = Character("Monaco", color="#ADD8E6")

label start:

    # 1. OPENING SCENE IN COUNTRYSIDE
    play music music_countryside
    scene bg_countryside with fade
    # Show a sprite so the screen isn't empty:
    show monk_normal at left

    narrator "Nel cuore di una terra verdeggiante, sorge un piccolo monastero. Là, un uomo di nome Ferondo vive con la sua moglie, la cui bellezza ha acceso il desiderio perfino in un Abate senza scrupoli."
    narrator "Ha inizio la storia di una beffa incredibile, di ‘morte’ e resurrezione, e soprattutto di ingenua gelosia…"

    # 2. THE ABATE REVEALS HIS DESIRE
    scene bg_monastery_hall with dissolve
    show abbot_smug at right
    narrator "All’interno del monastero, l’Abate medita il suo piano."
    abbot "Per troppo tempo ho bramato la moglie di Ferondo. La sua grazia e la sua avvenenza sono un dono che non posso lasciare a quell’uomo rozzo e geloso!"
    abbot "Preparerò una pozione che gli darà l’apparenza della morte. Così lo terrò lontano, e la moglie… beh, la consolerò io."

    # 3. FERONDO & WIFE AT HOME
    scene bg_village_home with dissolve
    play music music_village
    show ferondo_normal at left
    show wife_normal at right

    ferondo "Mia dolce moglie, questa gelosia mi tormenta. Non sopporto l’idea che qualcun altro possa anche solo posare gli occhi su di te."
    wife "Ah, Ferondo, tu mi opprimi con i tuoi sospetti! L’Abate dice di avere un metodo per liberarti da questa ossessione..."
    ferondo "Quell’Abate? Se può davvero curarmi… allora sia. Ma ho un brutto presentimento."

    # 4. INTERACTIVE CHOICE: Let the player pick Ferondo's initial attitude
    # Instead of putting "Ferondo's Attitude Toward the Abate's Plan:" inside menu,
    # we show it as a narrator line or a question line, then place the actual choices.
    narrator "Ferondo's Attitude Toward the Abate's Plan?"
    menu:
        "Accettare con riluttanza (canonica)":
            jump accept_plan
        "Opporsi e tentare di resistere":
            jump resist_plan

label accept_plan:
    scene bg_monastery_hall with dissolve
    play music music_somber
    show abbot_smug at right
    show wife_conflicted at left
    abbot "Benvenuti, figli miei. Ho preparato una speciale pozione che scaccerà dal tuo cuore ogni morbo di gelosia."
    ferondo "Mi rimetto al vostro giudizio, padre."
    wife "(Questo Abate mi scruta con un desiderio inquietante…)"
    jump drink_potion

label resist_plan:
    # A short scene, then merges back into the main line
    scene bg_monastery_hall with dissolve
    show wife_conflicted at right
    show monk_normal at left
    narrator "Ferondo, sospettoso, all’inizio rifiuta. Ma l’insistenza di sua moglie e l’abilità oratoria dell’Abate lo persuadono."
    wife "Ti scongiuro, Ferondo. Prova questa cura. Non possiamo continuare così…"
    monk "È un rimedio approvato dalla nostra sapienza monastica, figliolo."
    ferondo "(sospiro) Va bene, mi arrendo. Farò come dite."
    jump drink_potion

label drink_potion:
    # 5. FERONDO DRINKS, 'DIES', AND IS BURIED
    hide wife_conflicted
    hide monk_normal
    show abbot_smug at center
    ferondo "Questa bevanda… mi sento… così stanco…"
    narrator "In pochi istanti, Ferondo cade in un sonno profondo come la morte."
    abbot "Portatelo nella cripta. Annunceremo che Ferondo è trapassato, vittima di un malanno improvviso."

    scene bg_tomb with fade
    play music music_resurrection
    show monk_normal at center
    narrator "Il corpo di Ferondo viene sepolto ufficialmente. Ma di notte, l’Abate e i monaci lo disseppelliscono e lo rinchiudono in una cella segreta."
    monk "Respira ancora. Padre, la pozione ha funzionato perfettamente."
    abbot "E ora, che l’inganno abbia inizio. Ditegli che è in Purgatorio e punite la sua gelosia!"

    # 6. FAKE PURGATORY
    show abbot_angel at right
    show ferondo_confused at left
    play music music_tense
    narrator "Ferondo si risveglia in un luogo buio, confuso, solo per essere accolto dall’Abate travestito da ‘angelo’ e dai monaci con bastoni."
    abbot "Anima tormentata, benvenuta in Purgatorio! Qui sconti la tua eccessiva gelosia. Riceverai punizioni finché non t'emenderai!"
    ferondo "Misericordia! Sono davvero morto? Vi prego, siate clementi!"

    # A short interactive reaction from Ferondo
    narrator "Ferondo’s Reaction to Punishment?"
    menu:
        "Implora pietà":
            ferondo "Vi scongiuro, lasciatemi in vita… o in morte! Ho imparato la lezione!"
        "Cerca di difendersi":
            ferondo "Non osate colpirmi, voi angeli crudeli! ...Ahia!"

    narrator "Qualsiasi reazione, Ferondo subisce ugualmente tormenti, credendo ciecamente all'inganno."

    # 7. THE ABBOT SEDUCES THE WIFE
    scene bg_monastery_hall with dissolve
    play music music_somber
    show abbot_smug at right
    show wife_conflicted at left
    abbot "Mia dolce donna, tuo marito è ormai in Purgatorio. Ma io posso pregare per la sua anima, e magari riportarlo indietro…"
    wife "(Lo sguardo dell’Abate è bramoso. Se accetto, forse avrà pietà di Ferondo. Se rifiuto, mio marito rimarrà dannato?)"

    narrator "Wife's Choice?"
    menu:
        "Resistere all’Abate":
            wife "Padre, questo è un peccato grave! Non voglio tradire Ferondo."
            abbot "Sciocca. Sai bene che senza il mio intervento, Ferondo non uscirà dal Purgatorio."
            narrator "La donna, pressata e impaurita, finisce comunque per cedere alle avances dell’Abate."
        "Cedere all'Abate":
            wife "(Con un senso di colpa lancinante) ...Acconsento, padre."
            abbot "Bene. Uniti nelle tenebre, salveremo l'anima di tuo marito..."

    narrator "Nei giorni e nelle notti successive, l’Abate trova gioia segreta nel letto della moglie di Ferondo. In capo a qualche mese, la donna scopre di essere incinta."

    # 8. FERONDO’S RELEASE
    scene bg_tomb with fade
    show abbot_angel at right
    show ferondo_confused at left
    narrator "Avendo ottenuto ciò che voleva, l’Abate decide che è tempo di far ‘resuscitare’ Ferondo."
    abbot "Tua moglie ha pregato a lungo per te, anima penitente. Il Signore ha concesso che tu faccia ritorno fra i vivi!"
    ferondo "Davvero? Che io sia lodato! Non peccherò mai più di gelosia!"

    # 9. MIRACLE & REBIRTH
    play music music_resurrection
    scene bg_countryside with dissolve
    show monk_normal at left
    show ferondo_confused at right
    narrator "Davanti agli occhi stupiti del villaggio, Ferondo ricompare vivo e vegeto. Tutti gridano al miracolo."
    monk "Mai si è visto un uomo tornare da morte certa!"
    ferondo "Ho scontato i miei peccati in Purgatorio. Lì ho appreso la lezione: mai più sarò geloso!"
    narrator "La gente, attonita, esalta la santità dell’Abate, ignara della subdola verità."

    # 10. THE ‘CHILD’ AND THE OBLIVIOUS END
    scene bg_village_home with dissolve
    show ferondo_confused at left
    show wife_conflicted at right
    narrator "Poco tempo dopo, la moglie di Ferondo partorisce un figlio. Ferondo, convinto che sia un miracolo postumo, non dubita minimamente della sua paternità."
    ferondo "È un dono divino! Dopo la mia esperienza ultraterrena, ecco la prova che il Cielo mi benedice!"
    wife "(Povero Ferondo… se sapesse la verità.)"

    # 11. EPILOGUE
    scene bg_countryside with fade
    show abbot_smug at center
    play music music_countryside
    narrator "Così si conclude la beffa dell’Abate: Ferondo, credendo d’esser stato in Purgatorio, rinuncia alla sua gelosia; la moglie, col bambino concepito dall’Abate, mantiene il segreto; e il villaggio celebra un falso miracolo."
    narrator "È la prova di come l’astuzia, il desiderio e la credulità possano intrecciarsi, dando vita a una storia che, per quanto comica e beffarda, rimane tra le più celebri del Decameron."

    return
