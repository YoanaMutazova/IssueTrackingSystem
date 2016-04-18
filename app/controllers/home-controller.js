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
        '$location',
        function ($scope, authentication, $cookies, $location) {
            var token = $cookies.get('access_token');

            if (!token) {
                $scope.template = 'app/views/user.html';
            } else {
                $scope.template = 'app/views/dashboard.html';
            }

            $scope.login = function (user) {
                authentication.login(user)
                    .then(function (success) {
                        $cookies.put('access_token', success);
                        $scope.template = 'app/views/dashboard.html';
                        }, function (error) {
                            console.log('invalid username or password');
                    });
            };

            $scope.register = function (user) {
                authentication.register(user);
                authentication.login(user)
                    .then(function (success) {
                        $cookies.put('access_token', success);
                        $scope.template = 'app/views/dashboard.html';
                    }, function (error) {
                        console.log(error);
                    });
            };

            $scope.logout = function() {
                authentication.logout()
                    .then(function (success) {
                        $cookies.remove('access_token');
                        $scope.template = 'app/views/user.html';
                    }, function (error) {
                        console.log(error);
                    });
            };
        }]);