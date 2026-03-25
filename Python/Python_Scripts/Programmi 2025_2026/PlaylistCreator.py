def get_input(lst):
    while True:
        canzone = input("Aggiungi una canzone alla tua playlist, digita stop per terminare la playlist: ")
        if canzone.lower() == "stop":
            break
        lst.append(canzone)
    return lst


def results_playlist(lst):
    print("La tua playlist è: ", lst)
    numberOfSongs = len(lst)
    print("Hai aggiunto ", numberOfSongs, "canzoni!")


def find_your_song(lst, song):
    wantedSong = lst.count(song)
    if wantedSong == 0:
        print("Risultato non trovato")
        return None
    print("Found song!")
    return song


def count_your_song(lst, song):
    verifiedSong = find_your_song(lst, song)
    if verifiedSong is None:
        return
    countedSong = lst.count(verifiedSong)
    print("Abbiamo trovato la tua canzone! E' presente ", countedSong, "volte, incredibile!")


def remove_a_song(lst, song):
    verifiedSong = find_your_song(lst, song)
    if verifiedSong is None:
        return lst
    lst.remove(verifiedSong)
    print("La tua canzone è stata rimossa! Ecco la lista aggiornata: ", lst)
    return lst


def reverse_order(lst):
    list_reversed = lst.copy()
    list_reversed.reverse()
    print("La tua lista è stata aggiornata da:", lst, " a ", list_reversed)
    return list_reversed


def order_reversed_alphabetically(lst):
    ordered = sorted(lst, reverse=True)
    print("Playlist ordinata alfabeticamente al contrario (Z->A):", ordered)
    return ordered


def playlist_to_string(lst):
    playlist_string = "! ".join(lst)
    print("La tua playlist come stringa è:\n", playlist_string)
    return playlist_string


def menu():
    while True:
        print("1. Execute PlaylistCreator")
        print("2. Exit the program")
        index = int(input("Select one of the two option: "))
        if index > 0 and index < 3:
            break
        else:
            print("Valore errato, riprova")
    return index


def menuPlaylistCreator():
    while True:
        print("1. Create your Playlist!")
        print("2. Find your song!")
        print("3. Count your song!")
        print("4. Remove a song!")
        print("5. Reverse the order!")
        print("6. Order reversed Alphabetically your songs!")
        print("7. Make your playlist a string!")
        print("8. Exit the menù")
        index = int(input("Select one of the option: "))
        if index > 0 and index < 9:
            break
        else:
            print("Valore errato, riprova")
    return index


def main():
    playlist = []
    while True:
        choice = menu()

        if choice == 1:
            while True:
                secondChoice = menuPlaylistCreator()

                if secondChoice == 1:
                    playlist = get_input(playlist)
                    results_playlist(playlist)

                elif secondChoice == 2:
                    song = input("Which song you want to find? ")
                    found_song = find_your_song(playlist, song)
                    if found_song is not None:
                        print("We found your song! ", found_song)

                elif secondChoice == 3:
                    song = input("Which song you want to count? ")
                    count_your_song(playlist, song)

                elif secondChoice == 4:
                    song = input("Which song you want to remove? ")
                    playlist = remove_a_song(playlist, song)

                elif secondChoice == 5:
                    playlist = reverse_order(playlist)

                elif secondChoice == 6:
                    playlist = order_reversed_alphabetically(playlist)

                elif secondChoice == 7:
                    playlist_string = playlist_to_string(playlist)
                    print("La tua playlist è diventata una stringa! Guarda un pò: ", playlist_string)

                elif secondChoice == 8:
                    print("Returning to main hub...")
                    break

        elif choice == 2:
            print("Exiting program...")
            break


main()
