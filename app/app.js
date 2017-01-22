'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'googlechart',

  'ui.bootstrap',

  'myApp.home',
  'myApp.budget',
  'myApp.calendar',
  'myApp.compare',
  'myApp.flow',

  'myApp.comparecolumn',
  'myApp.compareicon',

  'myApp.osiapi',
  'myApp.buildingselect',

  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home/'});
}])
.controller('NavCtrl', function($scope, $location) {

  $scope.getClass = function(path) {
    return ($location.path().startsWith(path) ? 'active' : '');
  }

})
.filter('toArray', function() {
  return function(input) {
    if (angular.isArray(input)) return input;
    var list = [];
    angular.forEach(input, iterateProperty, list);
    return list;
    function iterateProperty(elt, key) {
      this.push({ key: key, value: elt });
    }
  }
});
