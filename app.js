var express = require('express');
var http = require('http');
var app = express();


app.get('/', function (req, res) {
    // var eventUrl =  'http://event.polarismedia.no/adressa/search/?dateFrom=2016-02-20&dateTo=2016-03-05&categories=8&page=1';
    var eventUrl = "www.statoil.no";
    var options = {
        host: "www-proxy.statoil.no",
        port: 80,
        path: eventUrl,
        headers: {
            Host: eventUrl
        }
    };
    http.get(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
