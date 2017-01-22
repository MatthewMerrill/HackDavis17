'use strict';

angular.module('myApp.compare', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compare/:buildingId/', {
    templateUrl: 'compare/compare.html',
    controller: 'CompareCtrl'
  });
}])

.controller('CompareCtrl', ['$scope', function($scope) {
  $scope.selectedBuildings = [];
  $scope.buildings = {
    'bainer-hall': {name: 'Bainer Hall', id: 'bainer-hall' },
    'hutchison-hall': {name: 'Hutchison Hall', id: 'hutchison-hall'},
    'jungerman-hall': {name: 'Jungerman Hall', id: 'jungerman-hall'},
    'mrak-hall': {name: 'Mrak Hall', id: 'mrak-hall'},
    'olson-hall': {name: 'Olson Hall', id: 'olson-hall'},
    'sproul-hall': {name: 'Sproul Hall', id: 'sproul-hall'},
    'wyatt-pavilion': { name: 'Wyatt Pavilion', id: 'wyatt-pavilion' }
  };

  // Toggle selection for a given fruit by name
  $scope.toggleSelection = function toggleSelection(fruitName) {
    var idx = $scope.selectedBuildings.indexOf(fruitName);

    // Is currently selected
    if (idx > -1) {
      $scope.selectedBuildings.splice(idx, 1);
    }
    else {
      $scope.selectedBuildings.push(fruitName);
    }
  };

}])

.filter('selectedBuildings', function() {
  return function(input, scope) {
    var out = [];
    angular.forEach(input, function(building) {
      if (scope.selectedBuildings.length === 0
        ||scope.selectedBuildings.indexOf(building.id) > -1)
        out.push(building);
    });
    return out;
  }
});