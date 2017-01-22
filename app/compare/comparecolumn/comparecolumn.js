'use strict';

angular.module('myApp.comparecolumn', ['ngRoute'])

.directive('compareColumn', function() {
  return {
    templateUrl: 'compare/comparecolumn/comparecolumn.html',
  }
});