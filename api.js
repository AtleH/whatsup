var express = require('express');
var http = require('http');
var moment = require('moment');
var app = express();

var runsBehindProxy = true;

function getRequestOptionsForPath(path) {
    var eventHost = 'event.polarismedia.no';
    var proxyHost = "www-proxy.statoil.no";
    return {
        host: runsBehindProxy ? proxyHost : eventHost,
        port: 80,
        path: path,
        headers: runsBehindProxy ? {Host: eventHost} : {}
    };
}

function getListEventsPath() {
    // http://event.polarismedia.no/adressa/search/?dateFrom=2016-02-20&dateTo=2016-03-05&categories=8&page=1
    //var eventPath = '/adressa/events/11948';
    var dateFormat = 'YYYY-MM-DD';
    var today = new Date();
    var fiveDaysAhead = new Date(today);
    fiveDaysAhead.setDate(fiveDaysAhead.getDate() + 5);
    var path = '/adressa/search/?dateFrom=' + moment(today).format(dateFormat) +
        '&dateTo=' + moment(fiveDaysAhead).format(dateFormat) + '&categories=8&page=1';
    console.log(path);
    return getRequestOptionsForPath(path);
}

app.use(express.static('client'));

app.get('/api/events', function (requestFromClient, responseToClient) {
    requestFromClient = http.request(getListEventsPath(), function (responseFromEventServer) {
        // Continuously update stream with data
        var body = '';
        responseFromEventServer.on('data', function (data) {
            body += data;
        });

        responseFromEventServer.on('end', function () {
            var eventListing = JSON.parse(body);
            var events = eventListing.events.map(function(event){
                return {
                    name: event.name,
                    startsAt: event.occurrence.dateFrom,
                    venue: event.venue.name
                };
            });
            responseToClient.send(events);
        });
    });
    requestFromClient.end();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
