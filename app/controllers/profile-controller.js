angular.module('issueTracker.controllers.profile', [
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

        $routeProvider.when('/profile/password', {
            templateUrl: 'app/views/change-password.html',
            controller: 'ProfileController',
            resolve: routeChecks.authenticated
        });
    }])
    .controller('ProfileController', [
        '$scope',
        '$location',
        'users',
        function ($scope, $location, users) {
            $scope.changePassword = function (changes) {
                users.changePassword(changes)
                    .then(function () {
                        toastr.success('Password successfully changed!');
                        $location.path('/dashboard');
                    });
            }
        }
    ]);