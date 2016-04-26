angular.module('issueTracker.controllers.projects', [
        'issueTracker.services.projects',
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
            $routeProvider.when('/projects', {
                templateUrl: 'app/views/projects/projects.html',
                controller: 'ProjectsController',
                resolve: routeChecks.authenticated
            });

            $routeProvider.when('/projects/:projectId', {
                templateUrl: 'app/views/projects/project.html',
                controller: 'ProjectsController',
                resolve: routeChecks.authenticated
            });
        }
    ])
    .controller('ProjectsController', [
        '$scope',
        'projects',
        'users',
        '$routeParams',
        function ($scope, projects, users, $routeParams) {

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

                        users.loggedUser()
                            .then(function (userInfo) {
                                var id = userInfo.Id;
                                if (id === $scope.projectInfo.Lead.Id) {
                                    $scope.leader = true;
                                    $scope.template = 'app/views/projects/edit-project.html';
                                } else {
                                    $scope.template = 'app/views/projects/project-info.html';
                                }
                            }, function (error) {
                                console.log(error);
                            });

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

            $scope.editProject = function (changedData) {
                projects.getProjectById($routeParams.projectId)
                    .then(function (success) {
                        projects.editProject($routeParams.projectId, success.Lead.Id, changedData)
                            .then(function (success) {
                                console.log(success);
                            }, function (error) {
                                console.log(error);
                            });
                    }, function(error) {
                        console.log(error);
                    });
            }
        }
    ]);