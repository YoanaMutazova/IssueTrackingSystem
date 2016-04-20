angular.module('issueTracker.services.projects', [
    'ngCookies'
])
    .factory('projects', [
        '$http',
        '$q',
        '$cookies',
        'BASE_URL',
        function ($http, $q, $cookies, BASE_URL) {
            function getAllProjects() {
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                $http({
                    url: BASE_URL + 'projects',
                    method: 'GET',
                    headers: {'Authorization': 'Bearer ' + token}
                })
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            function getProjectById(id) {
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                $http({
                    url: BASE_URL + 'projects/' + id,
                    method: 'GET',
                    headers: {'Authorization': 'Bearer ' + token}
                })
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            function getProjectIssues(projectId) {
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                $http({
                    url: BASE_URL + 'projects/' + projectId + '/issues',
                    method: 'GET',
                    headers: {'Authorization': 'Bearer ' + token}
                })
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            function editProject(projectId, leadId, projectInfo) {
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                var data = {
                    Name: projectInfo.name,
                    Description: projectInfo.description,
                    LeadId: leadId
                };

                $http({
                    url: BASE_URL + 'projects/' + projectId,
                    method: 'PUT',
                    headers: {'Authorization': 'Bearer ' + token},
                    data: data
                })
                    .then(function (success) {
                        console.log(success.data);
                    }, function (error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            return {
                getAllProjects: getAllProjects,
                getProjectById: getProjectById,
                getProjectIssues: getProjectIssues,
                editProject: editProject
            }
        }
    ]);