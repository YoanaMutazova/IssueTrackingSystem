angular.module('issueTracker.services.users', [])
    .factory('users', [
        '$http',
        '$q',
        '$cookies',
        'BASE_URL',
        function ($http, $q, $cookies, BASE_URL) {
            function allUsers() {
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                $http({
                    url: BASE_URL + 'users',
                    method: 'GET',
                    headers: {'Authorization': 'Bearer ' + token}
                })
                    .then(function (users) {
                        deferred.resolve(users.data);
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
                    .then(function (user) {
                        deferred.resolve(user.data);
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
                    });

                return deferred.promise;
            }

            return {
                allUsers: allUsers,
                loggedUser: loggedUser,
                changePassword: changePassword,
            }
    }]);