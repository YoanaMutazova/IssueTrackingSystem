angular.module('issueTracker.controllers.main', [])
    .controller('MainController', [
        '$scope',
        '$cookies',
        function ($scope, $cookies) {
            $scope.isAuthenticated = $cookies.get('access_token');
        }
    ]);