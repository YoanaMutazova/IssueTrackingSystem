angular.module('issueTracker.controllers.issues', [
        'issueTracker.services.projects',
        'issueTracker.services.users',
        'issueTracker.services.users'
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

        $routeProvider.when('/projects/:projectId/add-issue', {
            templateUrl: 'app/views/issues/add-issue.html',
            controller: 'IssuesController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/issues/:issueId', {
            templateUrl: 'app/views/issues/issue.html',
            controller: 'IssueController',
            resolve: routeChecks.authenticated
        });
    }
    ])
    .controller('IssuesController', [
        '$scope',
        'projects',
        'users',
        '$routeParams',
        function ($scope, projects, users, $routeParams) {
            var projectId = $routeParams.projectId;

            users.loggedUser();
            users.allUsers()
                .then(function (users) {
                    $scope.allUsers = users;
                });

            projects.getAllProjects()
                .then(function (projects) {
                   $scope.allProjects =  projects;
                });

            projects.getProjectById(projectId)
                .then(function (project) {
                    $scope.labels = project.Labels;
                    $scope.priorities = project.Priorities;
                });

            $scope.createIssue = function (issueInfo) {
                console.log(issueInfo.title);
                console.log(issueInfo.label);
                //issues.createIssue(issueInfo)
                //    .then(function (s) {
                //        console.log(s);
                //    }, function (e) {
                //        console.log(e);
                //    });
            };
        }
    ])
    .controller('IssueController', [
        '$scope',
        'issues',
        'users',
        'projects',
        'toastr',
        '$routeParams',
        function ($scope, issues, users, projects, toastr, $routeParams) {
            var issueId = $routeParams.issueId,
                issueAssignee,
                currentUser,
                isAdmin,
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
                            currentUser = user.Username;
                            isAdmin = user.isAdmin;
                        });

                    projects.getProjectById(projectId)
                        .then(function (project) {
                            projectLeader = project.Lead.Username;
                            $scope.leadId = project.Lead.Id;
                        });

                    if (currentUser === projectLeader || currentUser === issueAssignee || isAdmin) {
                        $scope.canChangeStatus = true;
                        if (currentUser !== issueAssignee) {
                            $scope.template = 'app/views/issues/issue-edit.html';
                        }
                    } else {
                        $scope.template = 'app/views/issues/issue-info.html';
                    }
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
                       toastr.success('Issue edited.')
                    });
            };

            $scope.changeStatus = function (statusId) {
                issues.changeIssueStatus(issueId, statusId)
                    .then(function () {
                        toastr.success('Status changed.');
                    });
            };
        }
    ]);