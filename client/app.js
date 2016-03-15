var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.event ='test2';
    $scope.events = [
        {"name": "Trønderkaillan", "startsAt": "2016-03-17T14:00+01:00", "venue": "Levanger bibliotek"},
        {"name": "TSO: Missa Solemnis", "startsAt": "2016-03-17T19:30+01:00", "venue": "Olavshallen"},
        {"name": "Zap Mama", "startsAt": "2016-03-17T20:00+01:00", "venue": "Dokkhuset"},
        {"name": "Vinterfestspill i Bergstaden", "startsAt": "2016-03-17T20:30+01:00", "venue": "Storstuggu"},
        {"name": "Anne Lene Hagglund m band", "startsAt": "2016-03-17T21:00+01:00", "venue": "Moskus"},
        {"name": "Luftforsvarets musikkorps: Påskerebus", "startsAt": "2016-03-18T12:00+01:00", "venue": "Byscenen"},
        {"name": "Stabat Mater av G. Pergolesi", "startsAt": "2016-03-18T18:00+01:00", "venue": "Birgittaklosteret i Trondheim"},
        {"name": "Drivhuset minifestival", "startsAt": "2016-03-18T18:00+01:00", "venue": "BrukBar/Blæst"},
        {"name": "William Hut", "startsAt": "2016-03-18T20:00+01:00", "venue": "Antikvariatet"},
        {"name": "Young Fogertys", "startsAt": "2016-03-18T20:00+01:00", "venue": "Mellomveien Bar"}];
    $http.get("/api/events")
        .then(function(response) {
            $scope.serverEvents = response.data;
        });
});
