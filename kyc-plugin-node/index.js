const http = require('http');
const hostname = '127.0.0.1';
const fs = require('fs');
const request = require('request')
const ejs = require('ejs');
const jwt = require('jsonwebtoken');

const port = 8080;

fs.readFile('icoplugin.html', 'utf-8', (err, html) => {
    if(err){
        throw err;
    }

    const server = http.createServer((req, res) => {
        console.log(req.method);
        if (req.method === "GET") {
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html');

            var token = ""

            var options = { method: 'GET',
              url: process.env.AUTH_URL,
              headers: 
               { 'x-api-key': process.env.API_KEY } };

            request(options, function (error, response, body) {
              if (error) throw new Error(error);

              token = JSON.parse(body).token
              console.log(token)
              var renderedHtml = ejs.render(html, {token: token});  //get redered HTML code
                res.write(renderedHtml);
                res.end();
            });
            return;
        }
        var jwtresponse = '';
        req.on('data', function(data) {
            jwtresponse += data;
        });
        req.on('end', function() {

            var cert = fs.readFileSync('idmpublickey.txt'); // get public key

            jwt.verify(jwtresponse, cert, function(err, decoded) {
                if (err) {
                    console.log("ERROR: validation failed " + err);
                    res.statusCode = 404;
                    res.setHeader('Content-type', 'text/html');
                    res.end('invalid post');
                } else {
                    console.log("Valid response from IDM");
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'text/html');
                    res.end('valid post');
                }
            });
        });
    });


    server.listen(port, hostname, () => {
        console.log("Server started on port " + port);
    });
});

