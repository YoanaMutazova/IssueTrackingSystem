angular.module('issueTracker.controllers.users', [
        'issueTracker.services.users'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if (authentication.isAuthenticated()) {
                    return q.when(true);
                }

                return $q.reject('not authorized');
            }]
        };

        $routeProvider.when('/users', {
            templateUrl: 'app/views/users.html',
            controller: 'UsersController',
            resolve: routeChecks.authenticated
        });
    }])
    .controller('UsersController', [
        '$scope',
        'users',
        function ($scope, users) {
            $scope.getAllUsers = function () {
                users.allUsers()
                    .then(function (success) {
                        $scope.allUsers = success;
                    }, function (error) {
                        console.log(error);
                    });
            };

            $scope.getCurrentUser = function () {
                users.loggedUser()
                    .then(function (success) {
                        $scope.loggedUser = success;
                    }, function (error) {
                        console.log(error);
                    });
            };

            $scope.changePassword = function (changed) {
                users.changePassword(changed)
                    .then(function (success) {
                        console.log(success);
                    }, function (error) {
                        console.log(error);
                    });
            }
        }
    ]);