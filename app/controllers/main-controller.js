angular.module('issueTracker.controllers.main', [])
    .controller('MainController', [
        '$scope',
        'users',
        '$cookies',
        function ($scope, users, $cookies) {
            var token = $cookies.get('access_token');
            if  (token) {
                $scope.authenticated = true;
            }

            users.loggedUser()
                .then(function (user) {
                    if (user.isAdmin === true) {
                        $scope.admin = true;
                    }
                });
        }
    ]);