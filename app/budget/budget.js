'use strict';

angular.module('myApp.budget', ['ngRoute', 'myApp.osiapi'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/budget/', {
    templateUrl: 'budget/budget.html',
    controller: 'BudgetCtrl'
  });
}])

.controller('BudgetCtrl', ['$scope', 'osiapi', '$q', function($scope, osiapi, $q) {
  osiapi.onReady(function () {
    if ($scope.building)
      osiapi.getDataFor($scope.building);

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {

      if (!$scope.selectedBuilding) {
        document.getElementById('chart_div').innerHTML = '<h3>Select a building to begin visualizing budget.</h3>';
        return;
      }

      var budgetMax = $scope.budgetMax;
      var budgetElectricity = $scope.budgetElectricity;
      var budgetSteam = $scope.budgetSteam;
      var budgetChilled = $scope.budgetChilled;

      var i = 0;

      var currElectricity, currSteam, currChilled;

      $q.all([
        osiapi.getDataFor($scope.selectedBuilding, 'electricity', new Date(), 365, (elec) => currElectricity = elec),
        osiapi.getDataFor($scope.selectedBuilding, 'steam', new Date(), 365, (steam) => currSteam = steam),
        osiapi.getDataFor($scope.selectedBuilding, 'chilled', new Date(), 365, (chill) => currChilled = chill)
      ]).then(function() {
        console.log(currElectricity, currSteam, currChilled);

        var data = google.visualization.arrayToDataTable([
          ['Energy Type', 'Electricity', 'Steam', 'Chilled Water', 'Budget Target'],
          ['Budgeted', budgetElectricity, budgetSteam, budgetChilled, budgetMax * 1],
          ['Past Year', currElectricity, currSteam, currChilled, budgetMax * 1]
        ]);

        var options = {
          title: 'Energy Budget',
          vAxis: {title: 'Allotted Energy'},
          legend: {position: 'bottom'},
          colors: ['green', 'orange', 'blue', 'black'],
          series: {3: {type: 'line'}},
          isStacked: true
        };

        var chart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      });
    }
    $scope.drawChart = drawChart;

    $scope.changedBuilding = function () {
      var currElectricity, currSteam, currChilled;

      $q.all([
        osiapi.getDataFor($scope.selectedBuilding, 'electricity', new Date(), 365, (elec) => $scope.budgetElectricity = elec),
        osiapi.getDataFor($scope.selectedBuilding, 'steam', new Date(), 365, (steam) => $scope.budgetSteam = steam),
        osiapi.getDataFor($scope.selectedBuilding, 'chilled', new Date(), 365, (chill) => $scope.budgetChilled = chill)
      ]).then(function() {
        console.log($scope.budgetElectricity, $scope.budgetSteam, $scope.budgetChilled);
        $scope.budgetMax = $scope.budgetElectricity + $scope.budgetSteam + $scope.budgetChilled;
        drawChart();
      });
    };

    $scope.searchText = "";
    $scope.buildings = osiapi.getBuildings();

    $scope.selectedBuilding = $scope.buildings[0];
  });
}]);