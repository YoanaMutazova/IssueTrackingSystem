angular.module('issueTracker.controllers.projects', [
        'issueTracker.services.projects'
    ])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/projects', {
                templateUrl: 'app/views/projects.html',
                controller: 'ProjectsController'
            })
        }
    ])
    .controller('ProjectsController', [
        '$scope',
        'projects',
        function ($scope, projects) {
            $scope.showProjects = function () {
                projects.getAllProjects()
                    .then(function (success) {
                        console.log(success);
                    });
            }
        }
    ]);