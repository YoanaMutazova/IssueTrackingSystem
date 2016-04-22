angular.module('issueTracker.controllers.home', [
        'issueTracker.services.authentication',
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
        'issues',
        '$cookies',
        '$location',
        '$window',
        function ($scope, authentication, issues, $cookies, $location, $window) {
            if (!authentication.isAuthenticated()) {
                $scope.template = 'app/views/user.html';
            } else {
                $scope.template = 'app/views/dashboard.html';

                issues.myIssues(5, 1, 'DueDate desc')
                    .then(function (issues) {
                        $scope.issues = issues;
                    }, function (error) {
                        console.log(error)
                    });
            }

            $scope.login = function (user) {
                authentication.login(user)
                    .then(function (success) {
                        $scope.template = 'app/views/dashboard.html';
                        $window.location.reload();
                        }, function (error) {
                            console.log('invalid username or password');
                    });
            };

            $scope.register = function (user) {
                authentication.register(user);
                authentication.login(user)
                    .then(function (success) {
                        $scope.template = 'app/views/dashboard.html';
                        $window.location.reload();
                    });
            };

            $scope.logout = function() {
                authentication.logout()
                    .then(function (success) {
                        $scope.template = 'app/views/user.html';
                        $window.location.reload();
                    });
            };
        }]);