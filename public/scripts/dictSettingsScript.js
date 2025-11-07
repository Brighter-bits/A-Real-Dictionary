let counter = 0;
let status = document.getElementById("status");
function AddKeyValue(key="", val=""){
    status.innerText = "";
    let div = document.getElementById("form");
    div.innerHTML += `<input id = "firstbox${counter}" style="height:15px; align:center" value = "${key}" type="text">
                        <p style="text-align:center; margin:5px" ><strong>=</strong></p>
                        <input id = "secondbox${counter}" style="height:15px; align:center" value = "${val}" type="text">`;
    counter++;
    document.getElementById("begin").appendChild(div);
}
document.getElementById("NewItem").onclick = function(){
    AddKeyValue(); //I hate that my mind came up with this solution without even needing to search the internet for a solution. I hate Javascript so much.
}
document.getElementById("form").onsubmit = function(event){
    event.preventDefault();
    let settings = {};
    for(let i = 0; i < counter; i++){
        let key = document.getElementById(`firstbox${i}`).value;
        let value = document.getElementById(`secondbox${i}`).value;
        if(key){ //Yes this is unsafe, no I don't care too much. I'll put input validation in later...
            settings[key] = value;
        }
    }
    localStorage.setItem('KeyToDef', JSON.stringify(settings));
    status.innerText = "Successfully Saved Settings!";
    status.style = "color:green;";
}
const currentsettings = localStorage.getItem('KeyToDef');
if (!(localStorage.getItem('KeyToDef') == {}) && !(localStorage.getItem('KeyToDef') == null)){
    let settings = JSON.parse(currentsettings);
    for (const [key, value] of Object.entries(settings)){
        console.log(`Key: ${key}, Value: ${value}`);
        AddKeyValue(key, value);
    }
} else{
    AddKeyValue();
}
document.getElementById("Home").onclick = function(){
    window.location.href = "dictionary.html";
}