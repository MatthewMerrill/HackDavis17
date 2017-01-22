'use strict';

angular.module('myApp.compareicon', ['ngRoute', 'myApp.osiapi'])

.directive('compareIcon', function() {
  return {
    templateUrl: 'compare/compareicon/compareicon.html',
    controller: 'CompareIconCtrl',

    // restrict: 'E',
    scope: true,
    link: function(scope, element, attributes){
      // scope.building = attributes.building;
      scope.utility = attributes.utility;
    }
  }
})

.controller('CompareIconCtrl', ['$scope', 'osiapi', '$q', '$attrs', function($scope, osiapi, $q, $attrs) {
  $scope.goodChange = true;

  // $scope.building = $attrs.building;
  $scope.utility = $attrs.utility;

  osiapi.onReady(function() {

    var before, after;

    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-7);

    var promises = [
      osiapi.getDataFor($scope.building.id, $scope.utility, today, 7, (data) => { after = data + Math.random()*100; console.log('homedata', data); }),
      osiapi.getDataFor($scope.building.id, $scope.utility, yesterday, 7, (data) => { before = data + Math.random()*100; console.log('homedata2', data); })
    ];

    $q.all(promises).then(function(){
      console.log('updating values!');

      $scope.goodChange = after <= before;
      $scope.changeInValue = (after-before).toFixed(2);
      $scope.newValue = after.toFixed(2);
      $scope.percentChange = ($scope.changeInValue/before*100).toFixed(2);

      console.log($scope.changeInValue);
      console.log($scope.percentChange);

      // if (!goodChange) {
      //   $scope.changeInValue = '+' + Math.floor($scope.changeInValue*10000)/100;
      //   $scope.percentChange = '+' + Math.floor($scope.percentChange*10000)/100;
      // }
    });
  });
}]);