/**
 * Created by kieran on 5/13/17.
 */

var express = require('express');
var router = express.Router();
var path = require("path");

//
// create a router for a home page
//
//noinspection JSUnusedLocalSymbols
router.get('/', function(req, res, next) {

    res.sendFile(path.join(__dirname+'/public/index.html'));   
});


module.exports = router;

