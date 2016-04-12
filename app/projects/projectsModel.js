angular.module('issueTracker.projects.projectsModel', [])
    .factory('projectsModel', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function allProjects() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects')
                    .then(function (success) {
                        console.log(success.data);
                    });
            }
        }
    ]);