angular.module('issueTracker.users.authentication', [])
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

                    });
                return deferred.promise;
            }

            function login(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'users/Login', user)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {

                    });
                return deferred.promise;
            }

            function logout() {
                var deferred = $q.defer();

                return deferred.promise;
            }

            return {
                register: register,
                login: login,
                logout: logout
            }
    }]);