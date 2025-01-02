import nltk
from nltk.corpus import wordnet as wn

nltk.data.path.append("wordnet.zip")
nltk.download('wordnet')

Bob = wn.synsets("Freezing")
print(Bob)
breakpoint()
print("Bean ")