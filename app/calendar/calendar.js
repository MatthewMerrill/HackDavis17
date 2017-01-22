'use strict';

angular.module('myApp.calendar', ['ngRoute', 'myApp.osiapi', 'googlechart'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calendar/', {
    templateUrl: 'calendar/calendar.html',
    controller: 'CalendarCtrl'
  });
}])

.controller('CalendarCtrl', ['$scope', 'osiapi', '$q', function($scope, osiapi, $q) {
  osiapi.onReady(function() {
    google.charts.load("current", {packages:["calendar"]});
    google.charts.setOnLoadCallback(drawChart);

    // function drawChart() {
    //   var dataTable = new google.visualization.DataTable();
    //   dataTable.addColumn({ type: 'date', id: 'Date' });
    //   dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
    //   dataTable.addRows([
    //     [ new Date(2012, 3, 13), 37032 ],
    //     [ new Date(2012, 3, 14), 38024 ],
    //     [ new Date(2012, 3, 15), 38024 ],
    //     [ new Date(2012, 3, 16), 38108 ],
    //     [ new Date(2012, 3, 17), 38229 ],
    //     // Many rows omitted for brevity.
    //     [ new Date(2013, 9, 4), 38177 ],
    //     [ new Date(2013, 9, 5), 38705 ],
    //     [ new Date(2013, 9, 12), 38210 ],
    //     [ new Date(2013, 9, 13), 38029 ],
    //     [ new Date(2013, 9, 19), 38823 ],
    //     [ new Date(2013, 9, 23), 38345 ],
    //     [ new Date(2013, 9, 24), 38436 ],
    //     [ new Date(2013, 9, 30), 38447 ]
    //   ]);
    //
    //   var chart = new google.visualization.Calendar(document.getElementById('calendar_div'));
    //
    //   var options = {
    //     title: "Red Sox Attendance",
    //     height: 350,
    //   };
    //
    //   chart.draw(dataTable, options);
    // }
    // var a = new google.visualization.DataTable();
    //
    // $scope.secondRow = [
    //   {v: new Date(2314, 2, 16)},
    //   {v: 13},
    //   {v: 'Lalibertines'},
    //   {v: 'They are very tall'},
    //   {v: 25},
    //   {v: 'Gallantors'},
    //   {v: 'First Encounter'}
    // ];
    //
    //
    // $scope.myChartObject.type = "Calendar";
    //
    // $scope.myChartObject.data = {"cols": [
    //   {id: "Date", label: "Date", type: "date"},
    //   {id: "Won/Loss", label: "Won/Loss", type: "number"}
    // ], "rows": [
    //   {c: [
    //     [ {v:new Date(2012, 3, 13)}, {v:37032} ]
    //     // [ new Date(2012, 3, 14), 38024 ],
    //     // [ new Date(2012, 3, 15), 38024 ],
    //     // [ new Date(2012, 3, 16), 38108 ],
    //     // [ new Date(2012, 3, 17), 38229 ],
    //     // // Many rows omitted for brevity.
    //     // [ new Date(2013, 9, 4), 38177 ],
    //     // [ new Date(2013, 9, 5), 38705 ],
    //     // [ new Date(2013, 9, 12), 38210 ],
    //     // [ new Date(2013, 9, 13), 38029 ],
    //     // [ new Date(2013, 9, 19), 38823 ],
    //     // [ new Date(2013, 9, 23), 38345 ],
    //     // [ new Date(2013, 9, 24), 38436 ],
    //     // [ new Date(2013, 9, 30), 38447 ]
    //   ]}
    // ]};
    //
    // $scope.myChartObject.options = {
    //   displayAnnotations: true
    // };


    function getDataForDate(date, building, energyType, callback){
      var sum = 0;
      var promises = [];
      for (var b in building){
        promises.push(osiapi.getDataForDate(date, building[b], energyType,
          function(data){ sum += data; }));
      }

      return $q.all(promises).then(() => {
        console.log('handing up sum');
        callback(sum)
      });
    }

    function generateRows(firstDate, lastDate, building, energyType, callback){
      var table = [];
      var i = 0;
      var currentDate = new Date(firstDate.getTime());

      var promises = [];

      while (currentDate <= lastDate) {

        (function(curDate, i) {
          promises.push(getDataForDate(currentDate, building, energyType,
            (sum) => { table[i] = [curDate, sum]; console.log(table[i]); }));
        })(new Date(currentDate.getTime()), i);

        currentDate.setDate(currentDate.getDate()+1);
        i += 1;
      }

      $q.all(promises).then(() => {
        console.log('okay, sending up table', table);
        callback(table)
      });
    }


    var wait = 0;
    function drawChart() {
      var dataTable = new google.visualization.DataTable();
      //do this stuff
      var today = new Date();
      var lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate()-14);

      var startingDate = $scope.startDate || lastWeek;
      var endingDate = $scope.endDate || today;
      var building = $scope.selectedBuildings;
      var energyType = $scope.selectedUtility;

      if (startingDate > endingDate) {
        $scope.errorMessage = "Start date must be before end date!";
      } else {
        $scope.errorMessage = "";
      }

      //did you do it?
      dataTable.addColumn({ type: 'date', id: 'Date' });
      dataTable.addColumn({ type: 'number', id: 'Won/Loss' });

      var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));
      var options = {
        title: "Calendar",
        height: 350,
        colorAxis: {
          colors:["#FFFFFF",getColorFor(energyType)],
        }
      };

      if (building && building.length) {
        generateRows(startingDate, endingDate, building, energyType,
          (table) => {
            dataTable.addRows(table)

            chart.draw(dataTable, options);
            wait = 1;
        });
      } else {
        chart.draw(dataTable, options);
        wait = 1;
      }
    }
    $scope.drawChart = drawChart;

    $scope.$watch(
      function(){return $scope.selectedBuildings},
      function(newValue, oldValue, scope) {
        console.log('wow');
        if (wait)
          $scope.drawChart();
      }, true)

  });

  function getColorFor(energyType) {
    if (energyType == 'electricity')
      return 'green';
    else if (energyType == 'steam')
      return 'orange';
    else
      return 'blue';
  }

  $scope.selectedUtility = 'electricity';

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