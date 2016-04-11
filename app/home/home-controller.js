angular.module('issueTracker.home', [
        'issueTracker.users.authentication'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', [
        '$scope',
        'authentication',
        function ($scope, authentication) {
            $scope.login = function (user) {
                authentication.login(user);
            };

            $scope.register = function (user) {
                authentication.register(user);
            };
        }]);