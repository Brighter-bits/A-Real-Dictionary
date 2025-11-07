var http = require('http');
var file = require("fs");
var url = require("url");
var path = require("path");
const PORT = 8364;
const PUBLIC = path.join(__dirname, "public");

function Server(req, res){
    if (req.method === "POST" && req.url === "/checkword"){
        const dictChecker = require("./dictchecker");
        return dictChecker(req, res);
    }
    var Controller = url.parse(req.url, true);
    var FileName = Controller.pathname;
    if (FileName == "/"){
        FileName = "/dictionary.html";
    };
    
    FileName = path.join(PUBLIC, FileName);
    if (!FileName.startsWith(PUBLIC)) {
        res.writeHead(403, {'Content-Type': 'text/html'});
        return res.end("403 FOOLISH MORTAL, YOU ARE FORBIDDEN FROM ENTERING HERE. BEGONE!");
    };
    
    if (!FileName.includes(".")){
        FileName += ".html";
    };
    
    if (FileName.search(/dictionary/g) >= 1){
        FileName = path.join(PUBLIC, "dictionary.html");
    };
    
    file.readFile(FileName, function(error, data){
        if (error){
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 You Idiot.");
        };
        switch (path.extname(FileName)){
            case ".js":
                res.writeHead(200, {'Content-Type': 'application/javascript'});
                break;
            case ".css":
                res.writeHead(200, {'Content-Type': 'text/css'});
                break;
            case ".html":
                res.writeHead(200, {'Content-Type': 'text/html'});
                break;
            case ".png":
                res.writeHead(200, {'Content-Type': 'image/png'});
                break;
            case ".jpg":
                res.writeHead(200, {'Content-Type': 'image/jpg'});
                break;
        };
        res.write(data);
        return res.end();
    });
}

http.createServer(Server).listen(PORT);
console.log("Server Running on port " + PORT);