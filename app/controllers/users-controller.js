angular.module('issueTracker.controllers.users', [
        'issueTracker.services.users'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if (authentication.isAuthenticated()) {
                    return $q.when(true);
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
                    .then(function (users) {
                        $scope.allUsers = users;
                    });
            };

            $scope.getCurrentUser = function () {
                users.loggedUser()
                    .then(function (user) {
                        $scope.loggedUser = user;
                    });
            };
        }
    ]);