'use strict';

angular.module('issueTracker', [
  'ngRoute',
    'issueTracker.controllers.main',
    'issueTracker.controllers.home',
    'issueTracker.controllers.projects',
    'issueTracker.controllers.users',
    'issueTracker.controllers.profile'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');