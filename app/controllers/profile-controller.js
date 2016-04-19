angular.module('issueTracker.controllers.profile', [
    'issueTracker.services.users'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/views/change-password.html',
            controller: 'ProfileController'
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