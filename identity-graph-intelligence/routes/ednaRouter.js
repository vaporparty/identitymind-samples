/**
 * Created by kieran on 5/13/17.
 */

var express = require('express');
var router = express.Router();
var request = require('request').defaults({strictSSL: false});

var ednaConfig = {};

ednaConfig.host =  "https://edna.identitymind.com";
ednaConfig.apiName = "apiNameHere";
ednaConfig.apiKey = "apiKeyHere";



router.use(function(req, res, next) {
    // do logging
    console.log(req.url);
    next(); // make sure we go to the next routes and don't stop here
});

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


//
// first handle the configuration
//
router.route('/config').get(function(req, res) {
    var html = '<!DOCTYPE html>' +
               '<header><link href="/stylesheets/style.css" type="text/css" rel="stylesheet" /></header>' +
                '<html><body>' +
               '<title>Configuration</title>\n' +
               '<a href="/">back</a><p>' +
               '<p><p>Note that configuration change is for the entire server, not just the current user<p><p>' +
               '<div class="container">' +
               '<form action="/im/config" method="post" id="myform">\n' +
                   '<label>host:</label><input type="text" name="host" id="host" size="40" value="'+ednaConfig.host+'" /><br>\n' +
                   '<label>API Name:</label><input type="text" name="apiName" id="apiName"  size="40" value="'+ednaConfig.apiName+'" /><br>\n' +
                   '<label>API Key:</label><input type="password" name="apiKey" id="apiKey"  size="40" value="'+ednaConfig.apiKey+' "/><br>\n' +
               '   <input type="submit"/>\n' +
           //    '  <button type="cancel" onclick="javascript:window.location="\'/\';">Cancel</button>' +
               '</form>\n' +
               '</div>' +
               "</body></html>";
    res.send(html)
});


router.post('/config', function(req, res) {
    console.log("Configuration update");
    ednaConfig.host = req.body.host;
    ednaConfig.apiName = req.body.apiName;
    ednaConfig.apiKey = req.body.apiKey;
    res.redirect("/");
});


//
// everything else under /im goes...
//
router.get('/*', function(req, res) {

    // build the edna URL
    var ednaURL = ednaConfig.host + "/im" + req.url;

    // and send
    console.log("request: " + ednaURL);
    request(ednaURL, function (error, ednaResponse, ednaResponseBody) {
        if (!error && ednaResponse.statusCode === 200) {
            // console.log(ednaResponseBody);
            res.write(ednaResponseBody);
            res.end();
        } else {
            console.log(error);
            if (ednaResponse !== undefined) {
                console.log(ednaResponse.statusCode);
                console.log(ednaResponse.body);
                res.json({message: "Failed to access eDNA: " + ednaResponse.statusCode + " - " + ednaResponse.body + " - " + error});
            } else {
                res.json({message: "Failed to access eDNA: " + error})
            }
        }
    }).auth(ednaConfig.apiName, ednaConfig.apiKey, false);

});


module.exports = router;

