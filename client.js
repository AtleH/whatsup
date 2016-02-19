/**
 * Created by ATLEH on 19.02.2016.
 */
var express = require('express');
var http = require('http');
var app = express();

app.get('/', function (req, res) {
    // var url =  'http://event.polarismedia.no/adressa/search/?dateFrom=2016-02-20&dateTo=2016-03-05&categories=8&page=1';
    var eventHost = 'event.polarismedia.no';
    var eventPath = '/adressa/events/11948';
    var optionsWithProxy = {
        host: "www-proxy.statoil.no",
        port: 80,
        path: "www.statoil.no",
        headers: {
            Host: "www.statoil.no"
        }
    };
    var optionsWithoutProxy = {
        host: eventHost,
        port: 80,
        path: eventPath
    };

    // Callback function is used to deal with response
    var callback = function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (data) {
            body += data;
        });

        response.on('end', function () {
            // Data received completely.
            console.log(body);
        });
    };
// Make a request to the server
    var req = http.request(optionsWithoutProxy, callback);
    req.end();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
