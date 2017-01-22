'use strict';

angular.module('myApp.home', ['ngRoute', 'myApp.osiapi'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'osiapi', function($scope, osiapi) {
  $scope.getDataFor = osiapi.getDataFor;
  $scope.getWeek= function(building, utility) {
    var buildingData = osiapi.getDataFor(building);

    return buildingData.interval.week.now[utility] -
      buildingData.interval.week.week[utility];
  };
  $scope.getWeekPercent = function(building, utility) {
    var buildingData = osiapi.getDataFor(building);

    return (buildingData.interval.week.now[utility].value -
      buildingData.interval.week.week[utility].value)/buildingData.interval.week.week[utility].value;
  };

  $scope.isRed = function(b, u) {
    return $scope.getWeekPercent(b, u)>0;
  };

}]);