from flask import Flask, render_template, request # This is for making the web app istself
from PyMultiDictionary import MultiDictionary, DICT_WORDNET #This here is the module which will provide the many different definitions
import re # This is just to clean up the dictionary modules formatting
import json
dictionary = MultiDictionary()
app = Flask("DictRD")
try:
    with open("words.json", "r") as f:
        names = json.load(f) # Names or other definitions should be layed out as a JSON e.g {"W":"Waluigi", "BF": "A word used by Idiots"}
except:print("No File")

@app.route('/')
def template():
    return render_template("index.html", exist=True) # Start off by going to the index page

@app.route('/User_Search', methods=['POST']) # When the user_search action is taken
def User_Search():
    word = str(request.form['input_word']) # Take the word input and convert it into a lowercase string
    Special = False # This is flagged when there is a special name/object to insert
    if "%" in word:
        halves = word.split("%")
        word = str(halves[0]).lower()
        name = str(halves[1])
        print(word)
        print(name)
        print(halves)
        Special = True
    try:
        definition = dictionary.meaning("en", word, DICT_WORDNET) # Get the definitions from wordnet
        print(definition)
        word_types = str(definition.keys()).replace("dict_keys(", "") # Get the keys and then get rid of the starting words
        word_types = re.sub(r'[^\w|,;]', "", word_types).split(",") # Get rid of the rest of the unneeded bits and then split by comma to make a list
        meanings = []
        for i in range(len(word_types)): # For every word type
            meanings.append(definition.get(word_types[i])) # Get all the definitions of one word type (e.g all the noun variations of a word)
            for j in range(len(meanings[i])): # For every definition of that word type
                meanings[i][j] = re.sub(r'[^\w|,; ]', "", meanings[i][j]) # Get rid of any unecessary parts
                if word_types[i] == "Verb":
                    meanings[i][j] = "To " + meanings[i][j] # Gramatically correct the verb definitions
            meanings[i] = list(map(lambda s: s.capitalize(), meanings[i])) # Make the definitions look like proper sentences
            if i == 0 and Special: # This will automatically place the name/object into the definition
                try:
                    meanings[0].insert(1, names[name]) # Add the modifiers to the first word type (usually nouns)
                except:
                    meanings[0].insert(1, "You")
            else:
                word = word.lower()
        print(meanings)
        return render_template("def.html", word=word, meanings=meanings, word_types=word_types) # Go to the definitions page
    except:
        return render_template("index.html", exist=False) # Reload the page with the error message

app.run(debug=True, port=8364)