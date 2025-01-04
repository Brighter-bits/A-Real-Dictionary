from flask import Flask, render_template, request # This is for making the web app istself
import nltk
from nltk.corpus import wordnet as wn #This here is the module which will provide the many different definitions
import re # This is just to clean up the dictionary modules formatting
import json
nltk.download('wordnet')
# nltk.data.path.append("wordnet.zip")
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
    else:
        word = word.lower()
    word = re.sub(r'[^A-Za-z0-9-]', "", word)
    try:
        definition = wn.synsets(word) # Get the definitions from wordnet
        print(definition)
        DefDict = {}
        for defs in definition:
            match defs._pos:
                case "n": # Noun
                    if "Noun" not in DefDict:
                        DefDict["Noun"] = [[defs._definition, defs._examples]]
                    else:
                        DefDict["Noun"].append([defs._definition, defs._examples])
                case "v": # Verb
                    if "Verb" not in DefDict:
                        DefDict["Verb"] = [[defs._definition, defs._examples]]
                    else:
                        DefDict["Verb"].append([defs._definition, defs._examples])
                case "s" | "a": # Adjective
                    if "Adjective" not in DefDict:
                        DefDict["Adjective"] = [[defs._definition, defs._examples]]
                    else:
                        DefDict["Adjective"].append([defs._definition, defs._examples])
                case "r": # Adverb
                    if "Adverb" not in DefDict:
                        DefDict["Adverb"] = [[defs._definition, defs._examples]]
                    else:
                        DefDict["Adverb"].append([defs._definition, defs._examples])
                case _:
                    raise AttributeError("THIS WORD TYPE HASN'T BEEN ADDED YET! ADD IT!")
        # breakpoint()
        word_types = str(DefDict.keys()).replace("dict_keys(", "") # Get the keys and then get rid of the starting words
        word_types = re.sub(r'[^\w|,;"]', "", word_types).split(",") # Get rid of the rest of the unneeded bits and then split by comma to make a list
        meanings = []
        for i in range(len(word_types)): # For every word type
            meanings.append(DefDict.get(word_types[i])) # Get all the definitions of one word type (e.g all the noun variations of a word)
            wordtype_definitions = []
            for j in range(len(meanings[i])): # For every definition and example of that word type
                meanings[i][j][0] = re.sub(r'`', "'", meanings[i][j][0]) # Change the terrible directional marks to actual apostrophes
                if " ; " in meanings[i][j][0]:
                    meanings[i][j][0] = re.sub(r" (; )+", " ", meanings[i][j][0])
                    meanings[i][j][1] = list(map(lambda x: "\"" + x + "\"", meanings[i][j][1]))
                    examples = '; '.join(meanings[i][j][1])
                    examples += "; "
                    meanings[i][j][0] = re.sub(r"; ", ("; "+examples), meanings[i][j][0])
                if word_types[i] == "Verb":
                    meanings[i][j][0] = "To " + meanings[i][j][0] # Gramatically correct the verb definitions
                wordtype_definitions.append(meanings[i][j][0])
            meanings[i] = list(map(lambda s: s.capitalize(), wordtype_definitions)) # Make the definitions look like proper sentences
            if i == 0 and Special: # This will automatically place the name/object into the definition
                try:
                    meanings[0].insert(1, names[name]) # Add the modifiers to the first word type (usually nouns)
                except:
                    meanings[0].insert(1, "You")
        print(meanings)
        return render_template("def.html", word=word, meanings=meanings, word_types=word_types) # Go to the definitions page
    except:
        return render_template("index.html", exist=False) # Reload the page with the error message

@app.route("/Home", methods=['POST'])
def Home():
    return render_template("index.html", exist=True)

# def handler(event, why):
#     from werkzeug.middleware.proxy_fix import ProxyFix
#     from werkzeug.serving import run_simple
#     app.wsgi_app = ProxyFix(app.wsgi_app)
#     return app

###