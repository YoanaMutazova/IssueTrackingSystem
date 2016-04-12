angular.module('issueTracker.projects', [])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/projects', {
                templateUrl: '',
                controller: 'ProjectsController'
            })
        }
    ])
    .controller('ProjectsController', [
        '$scope',
        function ($scope) {

        }
    ]);