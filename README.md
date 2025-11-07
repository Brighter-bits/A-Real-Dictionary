# A Real Dictionary

A completely ordinary dictionary that you can insert your own definitions into, the most trusted dictionary in the world according to about five people.

# Getting Started

You can either clone this repo and go through the installation or you can go to [the website](https://www.BrightShadeBits.com/dictionary).

## Installation

Clone the repo using ```git clone https://github.com/Brighter-bits/A-Real-Dictionary.git``` or just download the source code.

You will then need to install [node-wordnet](https://www.npmjs.com/package/node-wordnet) ([github](https://github.com/morungos/wordnet)):
 ```npm i node-wordnet```

You will also need to download a copy of [wordnet](https://wordnetcode.princeton.edu/wn3.1.dict.tar.gz) (this is a direct link to Princeton's download page. For the paranoid you can also get a copy from
[here](https://wordnet.princeton.edu/download/current-version), make sure to download the WordNet 3.1 database files) itself and extract it so that it becomes "wn3.1.dict/dict/{lots of files}". 

Make sure this is in the same folder as Main.js and dictchecker.js. Also make sure that the word "dictionary" (in lower case) isn't in the folder's path.

Once this is all set up, run ```node Main.js``` and then go to http://127.0.0.1:8364.

# Adding New Definitions

With this port comes the new feature of the settings menu. This is accessed at {url}/dictSettings or by pressing the cog in the top left of the main webpage. 

In here, you can add definitions using the add item button, this will create two boxes: The Key on the left is what you will type in to get the special definition to show up; The Value on the right is what will
appear in the definitions.

Make sure to press the Save Settings Button!

All settings are saved in the browser's local storage, and if a box is left empty then it is deleted and shouldn't take up space.

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
- This project is largely possible due to both Morungos's node-wordnet package and Princeton University's wordnet project.
- The actual website doesn't look very good
- Definition Keywords are case sensitive