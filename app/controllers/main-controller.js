angular.module('issueTracker.controllers.main', [])
    .controller('MainController', [
        '$scope',
        '$cookies',
        function ($scope, $cookies) {
           var isAuthenticated = $cookies.get('access_token');

        }
    ]);