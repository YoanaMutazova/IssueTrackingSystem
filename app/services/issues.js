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
                    .then(function (myIssues) {
                        deferred.resolve(myIssues);
                    });

                return deferred.promise;
            }

            function createIssue (issueInfo) {
                var deferred = $q.defer();
                var token = $cookies.get('access_token');

                $http({
                    method: 'POST',
                    url: BASE_URL + 'issues',
                    headers: {'Authorization': 'Bearer ' + token},
                    data: issueInfo
                })
                    .then(function (issue) {
                        deferred.resolve(issue);
                    }, function (error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            function issueInfo(issueId) {
                var deferred = $q.defer();
                var token = $cookies.get('access_token');

                $http({
                    method: 'GET',
                    url: BASE_URL + 'issues/' + issueId,
                    headers: {'Authorization': 'Bearer ' + token},
                })
                    .then(function (issueInfo) {
                        deferred.resolve(issueInfo.data);
                    });

                return deferred.promise;
            }

            function editIssue(issueId, issueInfo) {
                var deferred = $q.defer();
                var token = $cookies.get('access_token');

                $http({
                    method: 'PUT',
                    url: BASE_URL + 'issues/' + issueId,
                    headers: {'Authorization': 'Bearer ' + token},
                    data: issueInfo
                })
                    .then(function (issue) {
                        deferred.resolve(issue);
                    });

                return deferred.promise;
            }

            function changeIssueStatus(issueId, statusId) {
                var deferred = $q.defer();
                var token = $cookies.get('access_token');

                $http({
                    method: 'PUT',
                    url: BASE_URL + 'issues/'+ issueId + '/changestatus?statusId=' + statusId,
                    headers: {'Authorization': 'Bearer ' + token},
                })
                    .then(function (issue) {
                        deferred.resolve(issue);
                    });

                return deferred.promise;
            }

            function getProjectIssues(pageSize, pageNumber, projectId) {
                var deferred = $q.defer();
                var token = $cookies.get('access_token');

                var urlFormatted = "issues/?pageSize=" + pageSize + "&pageNumber=" + pageNumber+ "&filter=Project.Id=" + projectId;

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

            function issueComments (issueId){
                var deferred = $q.defer();
                var token = $cookies.get('access_token');

                $http({
                    method: 'GET',
                    url: BASE_URL + 'issues/'+ issueId + '/comments',
                    headers: {Authorization: 'Bearer ' + token}
                })
                    .then(function (comments) {
                        deferred.resolve(comments.data);
                    });

                return deferred.promise;
            }

            return {
                myIssues: myIssues,
                createIssue: createIssue,
                issueInfo: issueInfo,
                editIssue: editIssue,
                changeIssueStatus: changeIssueStatus,
                getProjectIssues: getProjectIssues,
                issueComments: issueComments
            }
        }
    ]);