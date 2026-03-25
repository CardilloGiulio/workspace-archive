import nltk
import spacy
import matplotlib.pyplot as plt
import WordCloud

# Scaricare il modello di lingua italiana per SpaCy
nlp = spacy.load("it_core_news_sm")

# Testo del Canto XXXIII (puoi sostituirlo con un file esterno)
testo_dante = """
La bocca sollevò dal fiero pasto
quel peccator forbendola a' capelli
del capo ch'elli avea di retro guasto.
"""

# Tokenizzazione del testo
tokens = nltk.word_tokenize(testo_dante, language="italian")

# Analisi grammaticale con SpaCy
doc = nlp(testo_dante)

# Estrarre parole chiave
keywords = [token.text for token in doc if token.is_alpha and not token.is_stop]

# Generare una word cloud
wordcloud = WordCloud(width=800, height=400, background_color='black', colormap='Reds').generate(" ".join(keywords))

# Mostrare la word cloud
plt.figure(figsize=(10, 5))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")
plt.show()

# Stampare parole chiave individuate
print("Parole chiave individuate:", keywords)