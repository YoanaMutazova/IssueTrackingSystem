angular.module('issueTracker.controllers.home', [
        'issueTracker.services.authentication',
        'issueTracker.services.issues',
        'issueTracker.services.issues'
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
        'users',
        'issues',
        '$cookies',
        'toastr',
        function ($scope, authentication, users, issues, $cookies, toastr) {
            if (!authentication.isAuthenticated()) {
                $scope.template = 'app/views/user.html';
            } else {
                $scope.template = 'app/views/dashboard.html';
            }

            $scope.login = function (user) {
                authentication.login(user)
                    .then(function () {
                        toastr.success('Successfully logged in!');
                        $scope.template = 'app/views/dashboard.html';
                    });
            };

            $scope.register = function (user) {
                authentication.register(user);
                authentication.login(user)
                    .then(function () {
                        toastr.success('Successfully registered!');
                        $scope.template = 'app/views/dashboard.html';
                    });
            };

            $scope.logout = function() {
                authentication.logout()
                    .then(function () {
                        toastr.success('Successfully logged out!');
                        $scope.template = 'app/views/user.html';
                    });
            };
        }]);