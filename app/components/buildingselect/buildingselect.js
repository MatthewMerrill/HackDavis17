'use strict';

angular.module('myApp.buildingselect', ['ngRoute'])

.directive('buildingSelect', function() {
  return {
    templateUrl: 'components/buildingselect/buildingselect.html',
    controller: 'BuildingSelectCtrl'
  };
})

.controller('BuildingSelectCtrl', ['$scope', 'osiapi', function($scope, osiapi) {
  $scope.searchText = "";
  $scope.selectedBuildings = [];

  osiapi.onReady(function(){
    $scope.buildings = osiapi.getBuildings();
  });

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

    $scope.selectedBuildings = $scope.selectedBuildings;
  };

  $scope.clearSelection = function() {
    $scope.selectedBuildings.length = 0;
  };

  $scope.selectAll = function() {
    $scope.selectedBuildings.length = 0;
    for (var key in $scope.buildings) {
      $scope.selectedBuildings.push(key);
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
    return out;1
  }
})

.filter('searchBuildings', function() {
  return function(input, scope) {
    var out = [];
    angular.forEach(input, function(building) {
      if (scope.searchText.length === 0
        ||building.name.toLowerCase().indexOf(scope.searchText.toLowerCase()) > -1)
        out.push(building);
    });
    return out;
  }
});