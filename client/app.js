var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
    $http.get("/api/events")
        .then(function(response) {
            $scope.events = response.data.events;
        });
});
