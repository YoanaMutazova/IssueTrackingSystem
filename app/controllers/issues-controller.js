angular.module('issueTracker.controllers.issues', [
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

        $routeProvider.when('/issues/:issueId', {
            templateUrl: 'app/views/issues/issue.html',
            controller: 'IssueController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/issues/:issueId/edit', {
            templateUrl: 'app/views/issues/issue-edit.html',
            controller: 'IssueController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/projects/:projectId/add-issue', {
            templateUrl: 'app/views/issues/add-issue.html',
            controller: 'IssuesController',
            resolve: routeChecks.authenticated
        });
    }
    ])
    .controller('IssuesController', [
        '$scope',
        'projects',
        'users',
        'issues',
        'toastr',
        '$location',
        '$routeParams',
        function ($scope, projects, users, issues, toastr, $location, $routeParams) {
            var projectId = $routeParams.projectId;

            $scope.labels = [];

            users.allUsers()
                .then(function (users) {
                    $scope.users = users;
                });

            projects.getProjectById(projectId)
                .then(function (project) {
                    $scope.projectName = project.Name;
                    $scope.labels = project.Labels;
                    $scope.priorities = project.Priorities;
                });

            $scope.createIssue = function (issueInfo) {
                if(issueInfo.labels == undefined) {
                    issueInfo.labels = [];
                }else{
                    var labels = issueInfo.labels.split(', ');
                    for (var i = 0; i < labels.length; i++) {
                        labels[i] = {Name: labels[i]};
                    }
                    issueInfo.labels = labels;
                }

                issueInfo.ProjectId = projectId;

                issues.createIssue(issueInfo)
                    .then(function () {
                        toastr.success('Issue created.');
                        $location.path('/projects/' + projectId);
                    });
            };
        }
    ])
    .controller('IssueController', [
        '$scope',
        'issues',
        'users',
        'projects',
        'toastr',
        '$window',
        '$location',
        '$routeParams',
        function ($scope, issues, users, projects, toastr, $window, $location, $routeParams) {
            var issueId = $routeParams.issueId,
                issueAssignee,
                projectId,
                projectLeader;

            issues.issueInfo(issueId)
                .then(function (issueInfo) {
                    $scope.issueInfo = issueInfo;
                    issueAssignee = issueInfo.Assignee.Username;
                    projectId = issueInfo.Project.Id;

                    users.loggedUser()
                        .then(function (user) {
                            $scope.currentUser = user.Id;
                            if (user.Username === projectLeader || user.Username === issueAssignee || user.isAdmin) {
                                $scope.canChangeStatus = true;
                            }
                        });

                    projects.getProjectById(projectId)
                        .then(function (project) {
                            projectLeader = project.Lead.Username;
                            $scope.leadId = project.Lead.Id;
                        });
                });

            issues.issueComments(issueId)
                .then(function (comments) {
                    $scope.comments = comments;
                });

            $scope.editIssue = function (issueInfo) {
                var data = {
                    Title: issueInfo.Title,
                    Description: issueInfo.Description,
                    DueDate: issueInfo.DueDate,
                    AssigneeId: issueInfo.Assignee.Id,
                    PriorityId: issueInfo.Priority.Id
                };

                issues.editIssue(issueId, data)
                    .then(function () {
                        toastr.success('Issue edited.');
                        $location.path('/issues/' + issueId);
                    });
            };

            $scope.changeStatus = function (statusId) {
                issues.changeIssueStatus(issueId, statusId)
                    .then(function () {
                        toastr.success('Status changed.');
                        setTimeout(function(){
                            $window.location.reload();
                        }, 800);
                    });
            };
        }
    ]);