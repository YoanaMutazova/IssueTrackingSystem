angular.module('issueTracker.home', [
        'issueTracker.users.authentication',
        'ngCookies'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', [
        '$scope',
        'authentication',
        '$cookies',
        function ($scope, authentication, $cookies) {
            $scope.login = function (user) {
                authentication.login(user);
            };

            $scope.register = function (user) {
                authentication.register(user);
                authentication.getUserToken(user);
            };
        }]);