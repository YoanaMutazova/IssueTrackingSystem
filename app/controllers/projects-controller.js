angular.module('issueTracker.controllers.projects', [
        'issueTracker.services.projects'
    ])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/projects', {
                templateUrl: 'app/views/projects.html',
                controller: 'ProjectsController'
            });

            $routeProvider.when('/projects/:projectId', {
                templateUrl: 'app/views/project.html',
                controller: 'ProjectsController'
            });
        }
    ])
    .controller('ProjectsController', [
        '$scope',
        'projects',
        '$routeParams',
        function ($scope, projects, $routeParams) {
            projects.getAllProjects()
                .then(function (success) {
                    $scope.projects = success;
                }, function (error) {
                    console.log(error);
                });

            $scope.projectById = function() {
                projects.getProjectById($routeParams.projectId)
                    .then(function (success) {
                        $scope.projectInfo = success;
                    }, function (error) {
                        console.log(error);
                    });
            }
        }
    ]);