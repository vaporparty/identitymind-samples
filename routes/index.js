/**
 * Created by kieran on 5/13/17.
 */

var express = require('express');
var router = express.Router();


//
// create a router for a home page
//
//noinspection JSUnusedLocalSymbols
router.get('/', function(req, res, next) {
    var html = "<html><body>" +
               "<title>Graph Server</title>" +
               "<div style='text-align:center'><img src='https://www.identitymindglobal.com/hubfs/IdentityMind_Global_theme/images/IDM_logo_tagline.png?t=1494635072687' width='300px' height='auto'/></div>" +
               "<h2>Graph Server Example Code</h2>" +
               "<h3><a href='/graph.html'>graph view</a></h3>" +
               "<h3><a href='/transfers.html'>transfer view</a></h3>" +
               "<h3><a href='/identity.html'>identity view</a></h3>" +
               "<a href='/im/config'>configuration</a></h3>" +
               "</body></html>";
    res.send(html)
});


module.exports = router;

