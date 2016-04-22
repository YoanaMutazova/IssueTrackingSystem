angular.module('issueTracker.services.issues', [])
    .factory('issues', [
        '$http',
        '$q',
        '$cookies',
        'BASE_URL',
        function ($http, $q, $cookies, BASE_URL) {
            function myIssues (pageSize, pageNumber, orderBy) {
                var deferred = $q.defer();
                var token = $cookies.get('access_token');

                $http({
                    method: 'GET',
                    url: BASE_URL + 'issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy,
                    headers: {'Authorization': 'Bearer ' + token},
                })
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            return {
                myIssues: myIssues
            }
        }
    ]);