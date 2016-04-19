angular.module('issueTracker.services.users', ['ngCookies'])
    .factory('users', [
        '$http',
        '$q',
        '$cookies',
        'BASE_URL',
        function ($http, $q,$cookies, BASE_URL) {
            function allUsers() {
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                $http({
                    url: BASE_URL + 'users',
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

            function loggedUser() {
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                $http({
                    url: BASE_URL + 'users/me',
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

            function changePassword(changed) {
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                $http({
                    method: 'POST',
                    url: BASE_URL + 'api/Account/ChangePassword',
                    headers: {'Authorization': 'Bearer ' + token},
                    data: changed
                })
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            return {
                allUsers: allUsers,
                loggedUser: loggedUser,
                changePassword: changePassword
            }
    }]);