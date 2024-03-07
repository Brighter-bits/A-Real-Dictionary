# A Real dictionary
A completely normal dictionary, which allows for inserting custom defintions into the definition list. There never was a more trusted dictionary.

# Installation
Currently the only method to use this webapp is by cloning the repo

## Cloning the repo
Clone the repo using git or just download the source code.
```
pip install -r {path to requirements.txt}
```
Then run Main.py and then go to http://127.0.0.1:8364 or follow the link output in the terminal

# Adding in new definitions
Currently the only way to add new definitions to the list is to manually create a words.json file in the same folder as Main.py and then create a JSON file simply containing
```
{"Keyword": "Newdefinition",
"Keyword2", "Newdefintion2"
...}
```
Hopefully this will become easier in the future

# Using the definitions
So it's all working and you are now at the main page. Great! You can now click on the search bar and begin searching up words.
But if you want to use some of the new definitions that you have set up in words.json, you will need to use '%'.
Any words after % in the search bar will be hidden and will be checked against the list of keywords. If the keyword isn't found then the default definition is "You".
You cannot use more than one extra definition at a time.

**Note: Do not put any spaces after %!**

## Examples

words.json:
```
{"W":"Waluigi", "BF": "A word used by Idiots"}
```

### Example 1

Input:
```
Purple%W
```
Output:
```
purple


Noun
    A purple color or pigment
    Waluigi
    Roman catholic church

Verb
    To become purple
    ...
    ...
...
```

### Example 2
Input:
```
patience%BF
```

Output:
```
patience


Noun
    Goodnatured tolerance of delay or incompetence

    A word used by idiots

    A card game played by one person
```

### Example 3
Input:
```
BRILLIANT%asd
```

Output:
```
brilliant

Adjective
    Of surpassing excellence

    You

    Having or marked by unusual and impressive intelligence

    Characterized by grandeur

    Having strong or striking color

    Full of light; shining intensely

    Clear and sharp and ringing
```

# Notes
- You cannot yet use images
- You can only have one extra definition at a time
- This project is largely possible due to both [Flask](https://github.com/pallets/flask/) for the webapp and [PyMultiDictionary](https://github.com/ppizarror/PyMultiDictionary) for all the actual dictionary definitions
- The actual website doesn't look very good