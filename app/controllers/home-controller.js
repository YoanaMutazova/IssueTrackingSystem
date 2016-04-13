angular.module('issueTracker.controllers.home', [
        'issueTracker.services.authentication',
        'ngCookies'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', [
        '$scope',
        'authentication',
        '$cookies',
        function ($scope, authentication, $cookies) {
            $scope.login = function (user) {
                authentication.getUserToken(user).then(function (success) {
                    $cookies.put('access_token', success);
                    console.log(success);
                }, function (error) {
                    console.log('invalid username or password');
                });
            };

            $scope.register = function (user) {
                authentication.register(user);
                authentication.getUserToken(user).then(function (success) {
                    $cookies.put('access_token', success);
                }, function (error) {
                    console.log(error);
                });
            };
        }]);