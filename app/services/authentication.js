angular.module('issueTracker.services.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function register(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            function getUserToken(user) {
                var deferred = $q.defer();

                var userInfo = "username=" + user.email + "&password=" + user.password + "&grant_type=password";

                $http({
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: userInfo
                })
                .then(function (success) {
                    deferred.resolve(success.data['access_token']);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function logout() {
                var deferred = $q.defer();

                return deferred.promise;
            }

            return {
                register: register,
                getUserToken: getUserToken,
                logout: logout
            }
    }]);