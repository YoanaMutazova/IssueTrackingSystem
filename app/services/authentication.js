angular.module('issueTracker.services.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        '$cookies',
        'BASE_URL',
        function ($http, $q,$cookies, BASE_URL) {
            function register(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    });

                return deferred.promise;
            }

            function login(user) {
                var deferred = $q.defer();

                var userInfo = "username=" + user.email + "&password=" + user.password + "&grant_type=password";

                $http({
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: userInfo
                })
                .then(function (success) {
                    $cookies.put('access_token', success.data['access_token']);
                    deferred.resolve(success.data['access_token']);
                });

                return deferred.promise;
            }

            function isAuthenticated() {
                return !!$cookies.get('access_token');
            }

            function logout() {
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                $http({
                    url: BASE_URL + 'api/Account/Logout',
                    method: 'POST',
                    headers: {'Authorization': 'Bearer ' + token}
                })
                    .then(function (success) {
                        $cookies.remove('access_token');
                        deferred.resolve(success);
                    });

                return deferred.promise;
            }

            return {
                register: register,
                login: login,
                isAuthenticated: isAuthenticated,
                logout: logout
            }
    }]);