'use strict';

angular.module('issueTracker', [
  'ngRoute',
    'ngCookies',
    'issueTracker.controllers.main',
    'issueTracker.controllers.home',
    'issueTracker.controllers.projects',
    'issueTracker.controllers.users',
    'issueTracker.controllers.profile'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (ev, current, privious, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        })
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');