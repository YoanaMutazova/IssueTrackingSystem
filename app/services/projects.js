angular.module('issueTracker.services.projects', [])
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
                    .then(function (projects) {
                        deferred.resolve(projects.data);
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
                    .then(function (project) {
                        deferred.resolve(project.data);
                    });

                return deferred.promise;
            }

            function myProjects(pageSize, pageNumber, userId) {
                var deferred = $q.defer();
                var token = $cookies.get('access_token');

                var urlFormatted = 'projects/?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&filter=Lead.Id=' + '"' + userId + '"';

                $http({
                    method: 'GET',
                    url: BASE_URL + urlFormatted,
                    headers: {Authorization: 'Bearer ' + token}
                })
                    .then(function (issues) {
                        deferred.resolve(issues.data);
                    });

                return deferred.promise;
            }

            function editProject(projectId, projectInfo) {
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                $http({
                    url: BASE_URL + 'projects/' + projectId,
                    method: 'PUT',
                    headers: {'Authorization': 'Bearer ' + token},
                    data: projectInfo
                })
                    .then(function (project) {
                        deferred.resolve(project.data);
                    });

                return deferred.promise;
            }

            return {
                getAllProjects: getAllProjects,
                getProjectById: getProjectById,
                editProject: editProject,
                myProjects: myProjects
            }
        }
    ]);