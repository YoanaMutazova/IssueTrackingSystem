angular.module('issueTracker.controllers.projects', [
        'issueTracker.services.projects',
        'issueTracker.services.users',
        'issueTracker.services.issues'
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
            $routeProvider.when('/projects', {
                templateUrl: 'app/views/projects/projects.html',
                controller: 'ProjectsController',
                resolve: routeChecks.authenticated
            });

            $routeProvider.when('/projects/:projectId', {
                templateUrl: 'app/views/projects/project-info.html',
                controller: 'ProjectController',
                resolve: routeChecks.authenticated
            });

            $routeProvider.when('/projects/:projectId/edit', {
                templateUrl: 'app/views/projects/edit-project.html',
                controller: 'ProjectController',
                resolve: routeChecks.authenticated
            });
        }
    ])
    .controller('ProjectsController', [
        '$scope',
        'users',
        'projects',
        function ($scope, users, projects) {
            projects.getAllProjects()
                .then(function (allProjects) {
                    $scope.projects = allProjects;
                });
        }
    ])
    .controller('ProjectController', [
        '$scope',
        'projects',
        'users',
        'issues',
        'toastr',
        '$routeParams',
        '$location',
        function ($scope, projects, users, issues, toastr, $routeParams, $location) {
            projects.getProjectById($routeParams.projectId)
                .then(function (projectInfo) {
                    $scope.projectInfo = projectInfo;
                    $scope.id = $routeParams.projectId;

                    users.loggedUser()
                        .then(function (user) {
                            if (user.Username === projectInfo.Lead.Username) {
                                $scope.canEdit = true;
                                $scope.editProject = function (project) {
                                    project.LeadId = project.Lead.Id;
                                    projects.editProject($routeParams.projectId, project)
                                        .then(function () {
                                            toastr.success('Project edited.');
                                            $location.path('/projects/' + project.Id);
                                        });
                                };
                            }
                        });
                });

            getProjectIssues(8, 1, $routeParams.projectId);

            $scope.changePage = function (page) {
                getProjectIssues(8, page, $routeParams.projectId);
            };

            function getProjectIssues(pageSize, pageNumber, id){
                issues.getProjectIssues(pageSize, pageNumber, id)
                    .then(function (issues) {
                        for (var i = 0; i < issues.Issues.length; i++) {
                            var obj = issues.Issues[i];
                            if(obj.Description.length > 40){
                                issues.Issues[i].Description = obj.Description.slice(0, 40) + '...';
                            }
                        }

                        $scope.issues = issues.Issues;
                        var pages = [];
                        for (var i = 0; i < issues.TotalPages; i++) {
                            pages.push(i + 1);
                        }
                        $scope.pages = pages;
                        $scope.current = pageNumber;
                        $scope.total = issues.TotalPages;
                    });
            }
        }
    ]);