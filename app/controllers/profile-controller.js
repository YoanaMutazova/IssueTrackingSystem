angular.module('issueTracker.controllers.profile', [
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

        $routeProvider.when('/profile/password', {
            templateUrl: 'app/views/change-password.html',
            controller: 'ProfileController',
            resolve: routeChecks.authenticated
        });
    }])
    .controller('ProfileController', [
        '$scope',
        'users',
        function ($scope, users) {
            $scope.changePassword = function (changes) {
                users.changePassword(changes)
                    .then(function (success) {
                        console.log('success');
                    }, function (error) {
                        console.log(error);
                    });
            }
        }
    ]);