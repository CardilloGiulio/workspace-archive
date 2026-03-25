import tkinter as tk
import random


class Heart:
    """Rappresenta un cuore che cade nello sfondo."""

    def __init__(self, canvas, width, height):
        self.canvas = canvas
        self.width = width
        self.height = height

        self.x = random.randint(20, self.width - 20)
        self.y = random.randint(-self.height, 0)
        self.speed = random.uniform(1.0, 3.0)
        self.size = random.randint(12, 24)
        self.color = random.choice(["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1"])

        self.item = self.canvas.create_text(
            self.x,
            self.y,
            text="❤",
            font=("Arial", self.size),
            fill=self.color
        )

    def move(self):
        self.y += self.speed
        self.canvas.move(self.item, 0, self.speed)

        if self.y > self.height + 20:
            self.reset()

    def reset(self):
        self.canvas.coords(
            self.item,
            random.randint(20, self.width - 20),
            random.randint(-100, -20)
        )
        self.y = random.randint(-100, -20)
        self.speed = random.uniform(1.0, 3.0)
        self.size = random.randint(12, 24)
        self.color = random.choice(["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1"])

        self.canvas.itemconfig(
            self.item,
            text="❤",
            font=("Arial", self.size),
            fill=self.color
        )


class HeartAnimation:
    """Gestisce l'animazione dei cuori di sfondo."""

    def __init__(self, canvas, width, height, heart_count=20):
        self.canvas = canvas
        self.width = width
        self.height = height
        self.hearts = [Heart(canvas, width, height) for _ in range(heart_count)]

    def update(self):
        for heart in self.hearts:
            heart.move()


class MessageManager:
    """Gestisce tutti i messaggi mostrati nell'interfaccia."""

    def __init__(self, label):
        self.label = label
        self.jokes = [
            "Papà, sei l'unico prof che probabilmente correggerebbe anche il codice del microonde!",
            "Sai perché i professori di informatica sono tranquilli? Perché hanno sempre il controllo dei processi.",
            "Papà, insegni così bene che perfino un 'while' ti ascolterebbe fino alla fine.",
            "Sei un grande insegnante: trasformi i bug in lezioni di vita.",
            "Altro che intelligenza artificiale: la vera potenza sei tu quando spieghi informatica!"
        ]
        self.compliments = [
            "Buona Festa del Papà al professore più forte del mondo!",
            "Grazie per insegnare con passione, pazienza e un pizzico di genialità.",
            "Sei un papà straordinario e un amante dell'informatica ancora più straordinario.",
            "Con te ogni problema sembra più semplice da risolvere.",
            "Sei il nostro algoritmo preferito: preciso, brillante e insostituibile."
        ]
        self.cs_messages = [
            "Compilazione completata: PAPÀ ECCEZIONALE = TRUE",
            "Sistema rilevato: professore di informatica con livello leggenda.",
            "Analisi terminata: tuo papà è compatibile con tutte le versioni della stima.",
            "Output del programma: affetto infinito + orgoglio massimo.",
            "Debug della giornata: nessun errore, solo tanto bene per papà."
        ]

    def show_text(self, text):
        self.label.config(text=text)

    def show_random_joke(self):
        self.show_text(random.choice(self.jokes))

    def show_random_compliment(self):
        self.show_text(random.choice(self.compliments))

    def show_random_cs_message(self):
        self.show_text(random.choice(self.cs_messages))


class SurpriseAnimation:
    """Gestisce l'animazione sorpresa del messaggio finale."""

    def __init__(self, parent, x, y):
        self.parent = parent
        self.label = tk.Label(
            parent,
            text="",
            font=("Arial", 24, "bold"),
            fg="#b30059",
            bg="#fff0f5"
        )
        self.label.place(x=x, y=y, anchor="center")

        self.full_text = "🎉 Buona Festa del Papà! 🎉"
        self.current_index = 0
        self.is_running = False
        self.blink_state = False

    def start(self):
        if self.is_running:
            return

        self.is_running = True
        self.current_index = 0
        self.label.config(text="")
        self._type_text()

    def _type_text(self):
        if self.current_index <= len(self.full_text):
            partial_text = self.full_text[:self.current_index]
            self.label.config(text=partial_text)
            self.current_index += 1
            self.parent.after(100, self._type_text)
        else:
            self._blink()

    def _blink(self):
        if not self.is_running:
            return

        self.blink_state = not self.blink_state
        color = "#b30059" if self.blink_state else "#ff4d6d"
        self.label.config(fg=color)
        self.parent.after(400, self._blink)


class FathersDayApp:
    """Applicazione principale."""

    WINDOW_WIDTH = 800
    WINDOW_HEIGHT = 520

    def __init__(self, root):
        self.root = root
        self.root.title("Festa del Papà - Versione Informatica")
        self.root.geometry(f"{self.WINDOW_WIDTH}x{self.WINDOW_HEIGHT}")
        self.root.resizable(False, False)
        self.root.configure(bg="#fff0f5")

        self.canvas = tk.Canvas(
            self.root,
            width=self.WINDOW_WIDTH,
            height=self.WINDOW_HEIGHT,
            bg="#fff0f5",
            highlightthickness=0
        )
        self.canvas.place(x=0, y=0)

        self.heart_animation = HeartAnimation(
            self.canvas,
            self.WINDOW_WIDTH,
            self.WINDOW_HEIGHT,
            heart_count=25
        )

        self._build_ui()
        self._animate()

    def _build_ui(self):
        self.title_label = tk.Label(
            self.root,
            text="Auguri al Papà Prof di Informatica!",
            font=("Arial", 22, "bold"),
            fg="#8a004f",
            bg="#fff0f5"
        )
        self.title_label.place(x=400, y=40, anchor="center")

        self.message_label = tk.Label(
            self.root,
            text="Clicca un pulsante per iniziare il programma dei sorrisi.",
            font=("Arial", 14),
            fg="#4a235a",
            bg="#fff0f5",
            wraplength=600,
            justify="center"
        )
        self.message_label.place(x=400, y=120, anchor="center")

        self.message_manager = MessageManager(self.message_label)

        self.button_frame = tk.Frame(self.root, bg="#fff0f5")
        self.button_frame.place(x=400, y=260, anchor="center")

        self._create_button(
            text="Battuta da Prof",
            row=0,
            col=0,
            command=self.message_manager.show_random_joke
        )

        self._create_button(
            text="Messaggio Informatico",
            row=0,
            col=1,
            command=self.message_manager.show_random_cs_message
        )

        self._create_button(
            text="Perché Sei Speciale",
            row=1,
            col=0,
            command=self.message_manager.show_random_compliment
        )

        self._create_button(
            text="Messaggio Personalizzato",
            row=1,
            col=1,
            command=self.show_personal_message
        )

        self._create_button(
            text="Sorpresa!",
            row=2,
            col=0,
            command=self.show_surprise
        )

        self._create_button(
            text="Chiudi",
            row=2,
            col=1,
            command=self.root.destroy
        )

        self.surprise_animation = SurpriseAnimation(self.root, x=400, y=430)

    def _create_button(self, text, row, col, command):
        button = tk.Button(
            self.button_frame,
            text=text,
            width=22,
            height=2,
            font=("Arial", 11, "bold"),
            bg="#ffd6e0",
            fg="#6a1b4d",
            activebackground="#ffb3c6",
            command=command
        )
        button.grid(row=row, column=col, padx=12, pady=10)

    def show_personal_message(self):
        text = (
            "Papà, tra lezioni, passione per l'informatica e tanta pazienza, "
            "sei davvero un esempio bellissimo. Buona Festa del Papà!"
        )
        self.message_manager.show_text(text)

    def show_surprise(self):
        self.message_manager.show_text(
            "Attenzione: animazione sorpresa in esecuzione..."
        )
        self.surprise_animation.start()

    def _animate(self):
        self.heart_animation.update()
        self.root.after(50, self._animate)


def main():
    root = tk.Tk()
    app = FathersDayApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()