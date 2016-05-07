angular.module('issueTracker.controllers.home', [
        'issueTracker.services.authentication',
        'issueTracker.services.users',
        'issueTracker.services.projects',
        'issueTracker.services.issues'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', [
        '$scope',
        'authentication',
        'users',
        'projects',
        'issues',
        '$cookies',
        '$window',
        'toastr',
        function ($scope, authentication, users, projects, issues, $cookies, $window, toastr) {
            if (!authentication.isAuthenticated()) {
                $scope.template = 'app/views/user.html';
            } else {
                $scope.template = 'app/views/dashboard.html';

                users.loggedUser()
                    .then(function (user) {
                        $scope.isAdmin = user.isAdmin;
                        getMyProjects(15, 1, user.Id);
                        $scope.changeProjectsPage = function (page) {
                            getMyProjects(15, page, user.Id);
                        };
                    });


                getMyIssues(10, 1, 'DueDate desc');

                $scope.changeIssuesPage = function (page) {
                    getMyIssues(10, page, 'DueDate desc');
                };
            }

            $scope.login = function (user) {
                authentication.login(user)
                    .then(function () {
                        toastr.success('Successfully logged in.');
                        setTimeout(function(){
                            $scope.template = 'app/views/dashboard.html';
                            $window.location.reload();
                        }, 800);
                    });
            };

            $scope.register = function (user) {
                authentication.register(user)
                    .then(function () {
                        authentication.login(user)
                            .then(function () {
                                toastr.success('Successfully registered.');
                                setTimeout(function(){
                                    $scope.template = 'app/views/dashboard.html';
                                    $window.location.reload();
                                }, 800);
                            });
                    });

            };

            $scope.logout = function() {
                authentication.logout()
                    .then(function () {
                        toastr.success('Successfully logged out.');
                        setTimeout(function(){
                            $scope.template = 'app/views/user.html';
                            $window.location.reload();
                        }, 800);
                    });
            };

            function getMyIssues(pageSize, pageNumber, orderBy){
                issues.myIssues(pageSize, pageNumber, orderBy)
                    .then(function (data) {
                        var issues = data.Issues;
                        for (var i = 0; i < issues.length; i++) {
                            var obj = issues[i];
                            if(obj.Description.length > 40){
                                issues[i].Description = obj.Description.slice(0, 40) + '...';
                            }
                        }

                        $scope.issues = issues;
                        var pages = [];
                        for (var i = 0; i < data.TotalPages; i++) {
                            pages.push(i + 1);
                        }
                        $scope.issuesPages = pages;
                        $scope.issuesCurrent = pageNumber;
                        $scope.issuesTotal = data.TotalPages;
                    });
            }

            function getMyProjects(pageSize, pageNumber, userId){
                projects.myProjects(pageSize, pageNumber, userId)
                    .then(function (data) {
                        var projects = data.Projects;
                        for (var i = 0; i < projects.length; i++) {
                            var obj = projects[i];
                            if(obj.Name.length > 50){
                                projects[i].Name = obj.Name.slice(0, 50) + '...';
                            }
                        }

                        $scope.projects = projects;
                        var pages = [];
                        for (var i = 0; i < data.TotalPages; i++) {
                            pages.push(i + 1);
                        }
                        $scope.projectsPages = pages;
                        $scope.projectsCurrent = pageNumber;
                        $scope.projectsTotal = data.TotalPages;
                    });
            }
        }]);