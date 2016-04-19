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

            if (!$routeParams.projectId) {
                projects.getAllProjects()
                    .then(function (success) {
                        $scope.projects = success;
                    }, function (error) {
                        console.log(error);
                    });
            } else {
                projects.getProjectById($routeParams.projectId)
                    .then(function (projectInfo) {
                        $scope.projectInfo = projectInfo;
                    }, function (error) {
                        console.log(error);
                    });

                projects.getProjectIssues($routeParams.projectId)
                    .then(function (issues) {
                        $scope.issues = issues;
                    }, function (error) {
                        console.log(error);
                    });
            }
        }
    ]);