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
    .run(['$location', 'authentication', function ($location, authentication) {
        if (!authentication.isAuthenticated()) {
            $location.path('/');
        }
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');