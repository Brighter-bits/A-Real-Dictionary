window.history.replaceState({}, "dictionary", "dictionary");
if (localStorage.getItem("KeyToDef") == null){
    localStorage.setItem("KeyToDef", JSON.stringify({}));
}
document.getElementById('input_word').addEventListener('input', function() {
    let output_container = document.getElementById('output_container');
    let input_word = document.getElementById('input_word');
    output_container.classList.remove("hiddenword");
    let input = input_word.value;
    let symbol = '%';
    let start_index = input.indexOf(symbol);
    if (start_index !== -1) {
        const visiblePart = input.substring(0, start_index);
        const hiddenPart = input.substring(start_index + symbol.length);
        output_container.innerHTML = visiblePart + '<span class="hiddenword">' + hiddenPart + '</span>';
    } else if (input === ""){
        output_container.innerHTML = "Search...";
    } else{
        output_container.innerHTML = input;
    }
});

document.getElementById('input_box').addEventListener('submit', async function(event) {
    event.preventDefault();
    let input_word = document.getElementById('input_word').value;
    let Special = false;
    let Key = "";
    if (input_word.includes('%')){
        try{
            Key = input_word.split('%')[1];
            input_word = input_word.split('%')[0];
            Special = true;
            console.log(`${input_word} - ${Key}`);
        } catch {}
    }
    try{
        const response = await fetch('/checkword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: input_word }),
        });
        
        if (response.ok) {
            const data = await response.json();
            Dictionary = {};
            for (let result of data.message){
                switch (result.pos) {
                    case 'n':
                        if ("Noun" in Dictionary){
                            Dictionary["Noun"].push(result.def);
                        } else{
                            Dictionary["Noun"] = [result.def];
                        };
                        break;
                    case 'v':
                        if ("Verb" in Dictionary){
                            Dictionary["Verb"].push("To " + result.def);
                        } else{
                            Dictionary["Verb"] = ["To " + result.def];
                        };
                        break;
                    case 's': // This is why I javascript. This makes sense but is stupid
                    case 'a':
                        if ("Adjective" in Dictionary){
                            Dictionary["Adjective"].push(result.def);
                        } else{
                            Dictionary["Adjective"] = [result.def];
                        };
                        break;
                    case 'r':
                        if ("Adverb" in Dictionary){
                            Dictionary["Adverb"].push(result.def);
                        } else{
                            Dictionary["Adverb"] = [result.def];
                        };
                        break;
                };
            };
            Dictionary["Name"] = input_word.toLowerCase();
            if (Special){
                let KeyToDef = JSON.parse(localStorage.getItem("KeyToDef"));
                if (!("Noun" in Dictionary)){
                    try{
                        Dictionary["Noun"] = [KeyToDef[Key]];
                    } catch{}
                } else{
                    try{
                        Dictionary["Noun"].splice(1, 0, KeyToDef[Key]);
                    } catch{}
                }
            }
            localStorage.setItem('Defs', JSON.stringify(Dictionary));
            window.location.href = '/def';
        } else{
            document.getElementById("ErrorMessage").style.visibility = "visible";
        }
    } catch (error) {
        document.getElementById("ErrorMessage").style.visibility = "visible";
    }
    
});

document.getElementById("output_container").addEventListener('click', function() {
    document.getElementById("input_word").focus();
})

document.getElementById("Home").onclick = function(){
    window.location.href = "index.html";
}

document.getElementById("Settings").onclick = function(){
    window.location.href = "dictSettings.html";
}