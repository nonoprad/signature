var fs = require("fs");
var http = require("http");
var url = require("url");

http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200);

    if(pathname == "/") {
        html = fs.readFileSync("index.html", "utf8");
        response.write(html);
    } else if (pathname == "/script.js") {
        script = fs.readFileSync("cartonsignature.js", "utf8");
        response.write(script);
    } else if (pathname == "/jquery.min.js") {
        script = fs.readFileSync("node_modules/jquery/dist/jquery.min.js", "utf8");
        response.write(script);
    } else if (pathname == "/style.css"){
        style = fs.readFileSync("style.css", "utf8");
        response.write(style);
    }


    response.end();
}).listen(8888);

console.log("Listening to server on 8888...");
