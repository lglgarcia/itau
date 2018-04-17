var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

http.createServer(function (request, response) {
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './assets')
        filePath = './index.html';

    console.log("url -> "+ request.url);
    console.log("filePath -> "+ filePath);
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    if (request.url == "/update-json") {
        // var str = JSON.stringify(request, null, 4);
        console.log(request.body);
        console.log(request.data);
        // for (x in request) {
        //     console.log(request);
        // }

        // todo: retornar json atualizado
        // logica atualiza arquivo json
        console.log('atualiza o json!!!!');
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(contentType, 'utf-8');
    }

    fs.readFile(filePath, function(error, content) {
        console.log("url -> "+ request.url);
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            // console.log( url.parse(request.url, true));
            if(request.url == "/teste.html") {
                fs.appendFile('./assets/data.json', ' This is my text.', function (err) {
                    if (err) 
                        throw err;
                    console.log('Updated!');
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end("atualizado","utf-8");
                });
            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        }
    });
    

}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');