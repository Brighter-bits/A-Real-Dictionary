import nltk
from nltk.corpus import wordnet as wn #This here is the module which will provide the many different definitions
import os

directory = "/"
nltk.data.path.append(directory)

definition = wn.synsets("Death")
print(definition)