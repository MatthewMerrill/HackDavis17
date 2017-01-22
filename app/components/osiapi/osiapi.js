'use strict';

angular.module('myApp.osiapi', [])

.factory('osiapi', ['$http', '$q', function($http, $q) {
  $http.defaults.headers.common.Authorization = 'Basic b3VccGktYXBpLXB1YmxpYzpNNTMkZHg3LGQzZlA4';

  var max = 9000000.0;
  var resExample = {
    name: 'Academic Surge Building',

    interval: {
      week: {
        now: {
          electricity: {
            timestamp: null,
            value: Math.random()*max
          },
          steam: {
            timestamp: null,
            value: Math.random()*max
          },
          cooled: {
            timestamp: null,
            value: Math.random()*max
          }
        },
        week: {
          electricity: {
            timestamp: null,
            value: Math.random()*max
          },
          steam: {
            timestamp: null,
            value: Math.random()*max
          },
          cooled: {
            timestamp: null,
            value: Math.random()*max
          }
        },
        year: {
          electricity: {
            timestamp: null,
            value: Math.random()*max
          },
          steam: {
            timestamp: null,
            value: Math.random()*max
          },
          cooled: {
            timestamp: null,
            value: Math.random()*max
          }
        }
      },
      year: {
        now: {
          electricity: {
            timestamp: null,
            value: Array.apply(null, Array(52)).map(function(_, i) {return (Math.random() * max);}).reduce(function(a,b){return a+b;})
          },
          steam: {
            timestamp: null,
            value: Array.apply(null, Array(52)).map(function(_, i) {return (Math.random() * max);}).reduce(function(a,b){return a+b;})
          },
          cooled: {
            timestamp: null,
              value: Array.apply(null, Array(52)).map(function(_, i) {return (Math.random() * max);}).reduce(function(a,b){return a+b;})
          }
        },
        year: {
          electricity: {
            timestamp: null,
            value: Array.apply(null, Array(52)).map(function(_, i) {return (Math.random() * max);}).reduce(function(a,b){return a+b;})
          },
          steam: {
            timestamp: null,
              value: Array.apply(null, Array(52)).map(function(_, i) {return (Math.random() * max);}).reduce(function(a,b){return a+b;})
          },
          cooled: {
            timestamp: null,
              value: Array.apply(null, Array(52)).map(function(_, i) {return (Math.random() * max);}).reduce(function(a,b){return a+b;})
          }
        }
      }
    }
  };

  var buildings = undefined;
  var ready = false;
  var onReady = [];
  function getBuildings() {
    if (buildings) return buildings;
    buildings = {};

    $http({
      method: 'GET',
      url: 'https://bldg-pi-api.ou.ad3.ucdavis.edu/piwebapi/elements/E0bgZy4oKQ9kiBiZJTW7eugwvgV_Y00J5BGt6DwVwsURwwVVRJTC1BRlxDRUZTXFVDREFWSVNcQlVJTERJTkdT/elements'
    }).then(function successCallback(response) {

      var buildingItems = response.data.Items;
      var buildingRequestPromises = [];

      for (var buildingItem of buildingItems) {
        (function(buildingItem){
          buildingRequestPromises.push(
            $http.get(buildingItem.Links.Attributes).then(function (buildingResponse) {
              console.log(buildingItem.Name, buildingResponse.data);
              buildings[buildingItem.Name.toLowerCase()] = {
                name: buildingItem.Name,
                id: buildingItem.Name.toLowerCase()
              };

              for (var buildingChildItem of buildingResponse.data.Items) {
                if (buildingChildItem.Name == 'Electricity Totalizer')
                  buildings[buildingItem.Name.toLowerCase()].electricity = buildingChildItem.Links.SummaryData;
                if (buildingChildItem.Name == 'Steam/Condensate Totalizer')
                  buildings[buildingItem.Name.toLowerCase()].steam = buildingChildItem.Links.SummaryData;
                if (buildingChildItem.Name == 'ChilledWater Totalizer') {
                  buildings[buildingItem.Name.toLowerCase()].chilled = buildingChildItem.Links.SummaryData;
                  buildings[buildingItem.Name.toLowerCase()].cooled = buildingChildItem.Links.SummaryData;
                }
              }
            })
          );
        })(buildingItem);
      }

      $q.all(buildingRequestPromises).then(() => {
        // setTimeout(function(){
          ready = true;
          console.log("Ready Freddie");

          for (var readyFunc of onReady) {
            readyFunc();
          }
        // }, 10);
      });
      // $http({})

    }, function errorCallback(response) {
      console.error("Error fetching buildings! :(", response);
    });
  }
  getBuildings();

  function getDataFor(buildingId, energyType, date, numberOfDays, callback) {
    console.log('Getting Data: ', '\''+buildingId+'\'', energyType, buildings);
    console.log(buildings[buildingId][energyType]);

    if (!buildings[buildingId][energyType]) {
      callback(0);
      return $q.resolve(0);
    }

    return $http.get(buildings[buildingId][energyType], {
      params: {
        startDate: date.toGMTString()+`-${numberOfDays}d`,
        endDate: date.toGMTString(),
        summaryType: 'Total'
      }
    }).then(function(res){
      console.log('Got data', res.data, 'for request ', buildingId, energyType);
      callback(res.data.Items[0].Value.Value);
    });
  }

  function getDataForDate(date, buildingId, energyType, callback) {
    return getDataFor(buildingId, energyType, date, 1, callback);
  }

  function setOnReady(callback) {
    if (ready)
      callback();
    else
      onReady.push(callback);
  }

  return {
    getBuildings: getBuildings,
    getDataFor: getDataFor,
    getDataForDate: getDataForDate,
    onReady: setOnReady
  }
}])

;