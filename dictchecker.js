var wordnet = require("node-wordnet");
module.exports = function dictChecker(req, res) {
    Dictionary = new wordnet(dataDir="./wn3.1.dict/dict");
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
        let { input } = JSON.parse(body);
        input = input.replaceAll(/[\<\>\{\}\[\]\(\)\'\`\"\‘\’\“\”]/g, "").toLowerCase();
        Dictionary.lookup(input, function(results) {
            console.log(results);
            if (results.length === 0) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({message: "No Definitions Found"}));
            }
            return res.end(JSON.stringify({message: results}));
        });
    });
};
