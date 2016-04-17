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
            projects.getAllProjects()
                .then(function (success) {
                    $scope.projects = success;
                }, function (error) {
                    console.log(error);
                });
            
            $scope.projectsById = function (id) {
                projects.getProjectById(id)
                    .then(function (success) {
                        console.log(success.data);
                    }, function (error) {
                        console.log(error);
                    });
            }
        }
    ]);