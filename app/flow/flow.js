'use strict';

angular.module('myApp.flow', ['ngRoute', 'myApp.osiapi'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flow/', {
    templateUrl: 'flow/flow.html',
    controller: 'FlowCtrl'
  });
}])

.controller('FlowCtrl', ['$scope', 'osiapi', function($scope, osiapi) {
  var buildingData = {"academic surge building":{"id":"academic surge building","caan":"4632","name":"Academic Surge Building","use":"OFF"},"activities and recreation center":{"id":"activities and recreation center","caan":"4799","name":"Activities and Recreation Center","use":"REC"},"advanced materials research laboratory":{"id":"advanced materials research laboratory","caan":"4853","name":"Advanced Materials Research Laboratory","use":"LAB"},"advanced transportation infrastructure research center":{"id":"advanced transportation infrastructure research center","caan":"4879","name":"Advanced Transportation Infrastructure Research Center","use":"LAB"},"agronomy field laboratory":{"id":"agronomy field laboratory","caan":"4192","name":"Agronomy Field Laboratory","use":"LAB"},"animal building":{"id":"animal building","caan":"4241","name":"Animal Building","use":"LAB"},"animal resource service j1":{"id":"animal resource service j1","caan":"3840","name":"Animal Resource Service J1","use":"LAB"},"aquatic biology & environmental science bldg":{"id":"aquatic biology & environmental science bldg","caan":"3813","name":"Aquatic Biology & Environmental Science Bldg","use":"LAB"},"arc pavilion":{"id":"arc pavilion","caan":"4444","name":"ARC Pavilion","use":"REC"},"art building":{"id":"art building","caan":"3971","name":"Art Building","use":"GEN"},"art building annex":{"id":"art building annex","caan":"3400","name":"Art Building Annex","use":"CLS"},"asmundson annex":{"id":"asmundson annex","caan":"3999","name":"Asmundson Annex","use":"LAB"},"bainer hall":{"id":"bainer hall","caan":"4004","name":"Bainer Hall","use":"LAB"},"bowley head house":{"id":"bowley head house","caan":"4758","name":"Bowley Head House","use":"LAB"},"briggs hall":{"id":"briggs hall","caan":"4273","name":"Briggs Hall","use":"LAB"},"campus data center":{"id":"campus data center","caan":"4471","name":"Campus Data Center","use":"SPT"},"cellular biology laboratory":{"id":"cellular biology laboratory","caan":"4452","name":"Cellular Biology Laboratory","use":"LAB"},"center for companion animal health":{"id":"center for companion animal health","caan":"4805","name":"Center for Companion Animal Health","use":"LAB"},"center for comparative medicine":{"id":"center for comparative medicine","caan":"4684","name":"Center for Comparative Medicine","use":"LAB"},"center for health & environment clinical medicine":{"id":"center for health & environment clinical medicine","caan":"4085","name":"Center for Health & Environment Clinical Medicine","use":"LAB"},"center for health & environment office & laboratory":{"id":"center for health & environment office & laboratory","caan":"3792","name":"Center for Health & Environment Office & Laboratory","use":"LAB"},"center for health & environment toxic pollutant laboratory":{"id":"center for health & environment toxic pollutant laboratory","caan":"4477","name":"Center for Health & Environment Toxic Pollutant Laboratory","use":"LAB"},"chemistry":{"id":"chemistry","caan":"3961","name":"Chemistry","use":"LAB"},"chemistry annex":{"id":"chemistry annex","caan":"3961B","name":"Chemistry Annex","use":"LAB"},"cole a":{"id":"cole a","caan":"4219","name":"Cole A","use":"LAB"},"cole b":{"id":"cole b","caan":"4220","name":"Cole B","use":"LAB"},"conference center":{"id":"conference center","caan":"4889","name":"Conference Center","use":"SPC"},"cruess hall":{"id":"cruess hall","caan":"3320","name":"Cruess Hall","use":"GEN"},"dairy cattle feed":{"id":"dairy cattle feed","caan":"3759","name":"Dairy Cattle Feed","use":"LAB"},"dairy cattle shed":{"id":"dairy cattle shed","caan":"3760","name":"Dairy Cattle Shed","use":"SPC"},"dutton hall":{"id":"dutton hall","caan":"4708","name":"Dutton Hall","use":"OFF"},"earth and physical sciences building":{"id":"earth and physical sciences building","caan":"4869","name":"Earth and Physical Sciences Building","use":"LAB"},"equestrian center caretaker trailer":{"id":"equestrian center caretaker trailer","caan":"4890","name":"Equestrian Center Caretaker Trailer","use":"RES"},"equestrian center covered arena":{"id":"equestrian center covered arena","caan":"4865","name":"Equestrian Center Covered Arena","use":"REC"},"fps trinchero building":{"id":"fps trinchero building","caan":"4920","name":"FPS Trinchero Building","use":"LAB"},"freeborn hall":{"id":"freeborn hall","caan":"3773","name":"Freeborn Hall","use":"SPC"},"gallagher hall":{"id":"gallagher hall","caan":"4872","name":"Gallagher Hall","use":"OFF"},"genome & biomedical sciences facility":{"id":"genome & biomedical sciences facility","caan":"4786","name":"Genome & Biomedical Sciences Facility","use":"LAB"},"geotechnical modeling facility":{"id":"geotechnical modeling facility","caan":"4813","name":"Geotechnical Modeling Facility","use":"LAB"},"ghausi hall":{"id":"ghausi hall","caan":"4725","name":"Ghausi Hall","use":"LAB"},"giedt hall":{"id":"giedt hall","caan":"4835","name":"Giedt Hall","use":"CLS"},"haring hall":{"id":"haring hall","caan":"3493","name":"Haring Hall","use":"CLS"},"hart hall":{"id":"hart hall","caan":"3207","name":"Hart Hall","use":"OFF"},"heitman staff learning center":{"id":"heitman staff learning center","caan":"3341","name":"Heitman Staff Learning Center","use":"CLS"},"hickey gym":{"id":"hickey gym","caan":"3331","name":"Hickey Gym","use":"REC"},"hoagland hall":{"id":"hoagland hall","caan":"3607","name":"Hoagland Hall","use":"OFF"},"housing administration":{"id":"housing administration","caan":"4474","name":"Housing Administration","use":"GEN"},"hunt hall":{"id":"hunt hall","caan":"3421","name":"Hunt Hall","use":"GEN"},"hutchison child development center":{"id":"hutchison child development center","caan":"4845","name":"Hutchison Child Development Center","use":"SPC"},"hutchison hall":{"id":"hutchison hall","caan":"3788","name":"Hutchison Hall","use":"LAB"},"iet communications resources":{"id":"iet communications resources","caan":"4910","name":"IET Communications Resources","use":"OFF"},"jungerman hall":{"id":"jungerman hall","caan":"3814","name":"Jungerman Hall","use":"LAB"},"kemper hall":{"id":"kemper hall","caan":"4633","name":"Kemper Hall","use":"CLS"},"kerr hall":{"id":"kerr hall","caan":"4302","name":"Kerr Hall","use":"OFF"},"king hall":{"id":"king hall","caan":"4051","name":"King Hall","use":"LIB"},"leukemia barn":{"id":"leukemia barn","caan":"4075","name":"Leukemia Barn","use":"LAB"},"leukemia lab":{"id":"leukemia lab","caan":"4078","name":"Leukemia Lab","use":"STR"},"life sciences":{"id":"life sciences","caan":"4683","name":"Life Sciences","use":"LAB"},"maddy lab":{"id":"maddy lab","caan":"4716","name":"Maddy Lab","use":"LAB"},"mann laboratory":{"id":"mann laboratory","caan":"3841","name":"Mann Laboratory","use":"LAB"},"mathematical sciences building":{"id":"mathematical sciences building","caan":"4821","name":"Mathematical Sciences Building","use":"OFF"},"medical sciences i d":{"id":"medical sciences i d","caan":"4430","name":"Medical Sciences I D","use":"LAB"},"memorial union":{"id":"memorial union","caan":"3460","name":"Memorial Union","use":"GEN"},"meyer hall":{"id":"meyer hall","caan":"4556","name":"Meyer Hall","use":"LAB"},"mrak hall":{"id":"mrak hall","caan":"3842","name":"Mrak Hall","use":"OFF"},"music building":{"id":"music building","caan":"3970","name":"Music Building","use":"CLS"},"olson hall":{"id":"olson hall","caan":"3803","name":"Olson Hall","use":"CLS"},"parsons seed certification center":{"id":"parsons seed certification center","caan":"4548","name":"Parsons Seed Certification Center","use":"SPC"},"pavilion parking structure":{"id":"pavilion parking structure","caan":"4827","name":"Pavilion Parking Structure","use":"PRK"},"physical sciences & engineering library":{"id":"physical sciences & engineering library","caan":"4243","name":"Physical Sciences & Engineering Library","use":"LIB"},"physics building":{"id":"physics building","caan":"4266","name":"Physics Building","use":"GEN"},"plant & environmental sciences":{"id":"plant & environmental sciences","caan":"4726","name":"Plant & Environmental Sciences","use":"LAB"},"primate childhood health & disease facility":{"id":"primate childhood health & disease facility","caan":"4874","name":"Primate Childhood Health & Disease Facility","use":"LAB"},"primate respiratory disease center":{"id":"primate respiratory disease center","caan":"4923","name":"Primate Respiratory Disease Center","use":"LAB"},"primate virology & immunology laboratory":{"id":"primate virology & immunology laboratory","caan":"4888","name":"Primate Virology & Immunology Laboratory","use":"LAB"},"pritchard vmth":{"id":"pritchard vmth","caan":"4267","name":"Pritchard VMTH","use":"THO"},"quad parking structure":{"id":"quad parking structure","caan":"4645","name":"Quad Parking Structure","use":"PRK"},"robbins hall":{"id":"robbins hall","caan":"3237","name":"Robbins Hall","use":"LAB"},"roessler hall":{"id":"roessler hall","caan":"4265","name":"Roessler Hall","use":"CLS"},"schaal aquatic center":{"id":"schaal aquatic center","caan":"4790","name":"Schaal Aquatic Center","use":"UNK"},"school of education building":{"id":"school of education building","caan":"4442","name":"School of Education Building","use":"GEN"},"sciences lab building":{"id":"sciences lab building","caan":"4792","name":"Sciences Lab Building","use":"GEN"},"segundo dining commons":{"id":"segundo dining commons","caan":"4802","name":"Segundo Dining Commons","use":"STH"},"segundo services center":{"id":"segundo services center","caan":"4897","name":"Segundo Services Center","use":"RES"},"shields library":{"id":"shields library","caan":"3390","name":"Shields Library","use":"LIB"},"social sciences & humanities":{"id":"social sciences & humanities","caan":"4656","name":"Social Sciences & Humanities","use":"OFF"},"sproul hall":{"id":"sproul hall","caan":"3815","name":"Sproul Hall","use":"OFF"},"storer hall":{"id":"storer hall","caan":"4073","name":"Storer Hall","use":"CLS"},"student community center":{"id":"student community center","caan":"4898","name":"Student Community Center","use":"SPC"},"student health & wellness center":{"id":"student health & wellness center","caan":"4871","name":"Student Health & Wellness Center","use":"MED"},"thurman laboratory":{"id":"thurman laboratory","caan":"4567","name":"Thurman Laboratory","use":"LAB"},"translational shared research facility":{"id":"translational shared research facility","caan":"4880","name":"Translational Shared Research Facility","use":"LAB"},"transportation and parking services":{"id":"transportation and parking services","caan":"4828","name":"Transportation and Parking Services","use":"SPT"},"tupper hall":{"id":"tupper hall","caan":"4427","name":"Tupper Hall","use":"LAB"},"university services building":{"id":"university services building","caan":"9556","name":"University Services Building","use":"OFF"},"valley hall":{"id":"valley hall","caan":"4822","name":"Valley Hall","use":"CLS"},"vet med 3a":{"id":"vet med 3a","caan":"4793","name":"Vet Med 3A","use":"LAB"},"vet med 3b":{"id":"vet med 3b","caan":"4921","name":"Vet Med 3B","use":"LAB"},"vet med equine athletic performance lab":{"id":"vet med equine athletic performance lab","caan":"4820","name":"Vet Med Equine Athletic Performance Lab","use":"LAB"},"vet med large animal facility":{"id":"vet med large animal facility","caan":"3490B","name":"Vet Med Large Animal Facility","use":"LAB"},"veterinary medicine 2":{"id":"veterinary medicine 2","caan":"4466","name":"Veterinary Medicine 2","use":"THO"},"vmth surgical":{"id":"vmth surgical","caan":"4268","name":"VMTH Surgical","use":"THO"},"vmth ward":{"id":"vmth ward","caan":"4269","name":"VMTH Ward","use":"THO"},"voorhies hall":{"id":"voorhies hall","caan":"3745","name":"Voorhies Hall","use":"OFF"},"walker hall":{"id":"walker hall","caan":"3201","name":"Walker Hall","use":"CLS"},"water science & engineering hydraulic l2":{"id":"water science & engineering hydraulic l2","caan":"3778","name":"Water Science & Engineering Hydraulic L2","use":"LAB"},"watershed science facility":{"id":"watershed science facility","caan":"4833","name":"Watershed Science Facility","use":"LAB"},"wellman hall":{"id":"wellman hall","caan":"4050","name":"Wellman Hall","use":"CLS"},"western human nutrition research center (whnrc)":{"id":"western human nutrition research center (whnrc)","caan":"4843","name":"Western Human Nutrition Research Center (WHNRC)","use":"LAB"},"wickson hall":{"id":"wickson hall","caan":"3351","name":"Wickson Hall","use":"CLS"},"wright hall":{"id":"wright hall","caan":"3972","name":"Wright Hall","use":"CLS"},"young hall":{"id":"young hall","caan":"3266","name":"Young Hall","use":"CLS"}}

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

  $scope.print = function(thing) {
    console.log(thing);
  };

  function containsAll(arr, sub) {
    for (var i = 0; i < sub.length; i++) {
      if (arr.includes(sub[i])) continue; else return false;
    }
    return true
  }

  const buildingTypeMap = {
    'OFF': 'Office',
    'LAB': 'Labratory',
    'GEN': 'Community',
    'STH': 'Community',
    'CLS': 'Classroom'
  };
  var energies = ['ChilledWater', 'Electricity', 'Steam'];
  var headers = { headers: { 'Authorization': 'Basic b3VccGktYXBpLXB1YmxpYzpNNTMkZHg3LGQzZlA4' }};
  var EUIBuildings = {};

  Object.values(buildingData).forEach(building => {
    fetch(`https://bldg-pi-api.ou.ad3.ucdavis.edu/piwebapi/search/query?q=afelementtemplate:*Building_CEED*%20AND%20name:*${building['name']}*`, headers)
      .then(res => res.json())
      .then(buildingJson => {
        console.log(buildingJson)
        fetch( buildingJson['Items'][0]['Links']['Self'], headers)
          .then(res => res.json())
          .then(data => {
            fetch( data['Links']['Elements'], headers)
              .then(res => res.json())
              .then(data => {
                let itemNames = data['Items'].map(item => item['Name'])
                if (containsAll(itemNames, energies)) {
                  EUIBuildings[building['name']] = building;
                  building['use'] = buildingTypeMap[building['use']] ? buildingTypeMap[building['use']] : 'Community'
                  building['sqft'] = buildingJson['Items'][0]['Attributes'].filter(attr => attr['Name'] == 'Sq.Ft.')[0]['Value']
                  data['Items'].forEach(energy => {
                    if (energies.includes(energy['Name'])) {
                      fetch(energy['Links']['Value'], headers)
                        .then(res => res.json())
                        .then(data => {
                          var value = data['Items'].filter(item => {
                            return (item['Name'].indexOf('EUI') > -1)
                          })[0]['Value']['Value']

                          EUIBuildings[building['name']][energy['Name']] = !isNaN(value) ? value : 0
                        })
                    }
                  })
                }
              })
          })
      })
  });

  setTimeout(function(){

    let li = Object.values(EUIBuildings);//.slice(0,4);
    console.log(li);

    function totalsForUse(use) {
      let elec = li.filter((item) => item.use == use)
        .map((item) => item.Electricity)
        .reduce((a,b) => a+b, 0);

      let steam = li.filter((item) => item.use == use)
        .map((item) => item.Steam)
        .reduce((a,b) => a+b, 0);

      let chill = li.filter((item) => item.use == use)
        .map((item) => item.ChilledWater)
        .reduce((a,b) => a+b, 0);

      return {
        Electricity: elec || 0,
        Steam: steam || 0,
        ChilledWater: chill || 0
      };
    }

    var communityTot = totalsForUse('Community');
    var officeTot = totalsForUse('Office');
    var classTot = totalsForUse('Classroom');
    var labTot = totalsForUse('Labratory');

    // console.log('community', communityTot);
    // console.log('office', officeTot);
    // console.log('class', classTot);
    // console.log('lab', labTot);


    // for(var bbuilding of li){
    //   console.log(bbuilding);
    //   if(bbuilding["use"] == "Community"){
    //     communityTot["Electricity"] += bbuilding["Electricity"];
    //     communityTot["Steam"] += bbuilding["Steam"];
    //     communityTot["ChilledWater"] += bbuilding["ChilledWater"];
    //   }
    //   else if(bbuilding["use"] == "Office"){
    //     officeTot["Electricity"] += bbuilding["Electricity"];
    //     officeTot["Steam"] += bbuilding["Steam"];
    //     officeTot["ChilledWater"] += bbuilding["ChilledWater"];
    //   }
    //   else if(bbuilding["use"] == "Classroom"){
    //     classTot["Electricity"] += bbuilding["Electricity"];
    //     classTot["Steam"] += bbuilding["Steam"];
    //     classTot["ChilledWater"] += bbuilding["ChilledWater"];
    //   }
    //   else{
    //     labTot["Electricity"] += bbuilding["Electricity"];
    //     labTot["Steam"] += bbuilding["Steam"];
    //     labTot["ChilledWater"] += bbuilding["ChilledWater"];
    //   }
    // }

    var cols = [
      ["Electricity ", "Classroom", classTot["Electricity"]],
      ["Electricity ", "Labs", labTot["Electricity"]],
      ["Electricity ", "Office", officeTot["Electricity"]],
      ["Electricity ", "Community", communityTot["Electricity"]],

      ["Steam ", "Classroom", classTot["Steam"]],
      ["Steam ", "Labs", labTot["Steam"]],
      ["Steam ", "Office", officeTot["Steam"]],
      ["Steam ", "Community", communityTot["Steam"]],

      ["Chilled Water ", "Classroom", classTot["ChilledWater"]],
      ["Chilled Water ", "Labs", labTot["ChilledWater"]],
      ["Chilled Water ", "Office", officeTot["ChilledWater"]],
      ["Chilled Water ", "Community", communityTot["ChilledWater"]],
    ];

    console.log(cols);

    for(var bbuilding of li.filter(item => item["use"] == "Labratory")){
      // console.log("ASDFOASIDJFASOIDJFASIODJF", bbuilding);
      cols.push(["Labs", bbuilding["name"], bbuilding.Electricity+bbuilding.Steam+bbuilding.ChilledWater||0]);
      // cols.push(["Labs", bbuilding["name"], bbuilding.Steam]);
      // cols.push(["Labs", bbuilding["name"], bbuilding.ChilledWater]);
    }
    for(var bbuilding of li.filter(item => item["use"] == "Classroom")){
      cols.push(["Classroom", bbuilding["name"], bbuilding.Electricity+bbuilding.Steam+bbuilding.ChilledWater||0])
      // cols.push(["Classroom", bbuilding["name"], bbuilding["Steam"]||0])
      // cols.push(["Classroom", bbuilding["name"], bbuilding["ChilledWater"]||0])
    }
    for(var bbuilding of li.filter(item => item["use"] == "Office")){
      cols.push(["Office", bbuilding["name"], bbuilding.Electricity+bbuilding.Steam+bbuilding.ChilledWater||0])
      // cols.push(["Office", bbuilding["name"], bbuilding["Steam"]||0])
      // cols.push(["Office", bbuilding["name"], bbuilding["ChilledWater"]||0])
    }
    for(var bbuilding of li.filter(item => item["use"] == "Community")){
      cols.push(["Community", bbuilding["name"], bbuilding.Electricity+bbuilding.Steam+bbuilding.ChilledWater||0])
      // cols.push(["Community", bbuilding["name"], bbuilding["Steam"]||0])
      // cols.push(["Community", bbuilding["name"], bbuilding["ChilledWater"]||0])
    }
    for(var bbuilding of li){
      cols.push([bbuilding["name"], "Electricity Costs", (bbuilding["Electricity"]||0)/**bbuilding["sqft"]*0.00029307107017*1000*.2245*/]);
      cols.push([bbuilding["name"], "Steam Costs", (bbuilding["Steam"]||0)/**bbuilding["sqft"]*0.00029307107017*1000*.2245*/]);
      cols.push([bbuilding["name"], "Chilled Water Costs", (bbuilding["ChilledWater"]||0)/**bbuilding["sqft"]*0.00029307107017*1000*.2245*/]);
    }

    google.charts.load('current', {'packages':['sankey']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'From');
      data.addColumn('string', 'To');
      data.addColumn('number', 'Weight');
      data.addRows(cols);

      // Sets chart options.
      var options = {
        sankey: {
          node: {nodePadding: 8 },
          iterations: 10000
        },
        interactivity: true,
        width: 1000,
        // height: 600
      };

      // Instantiates and draws our chart, passing in some options.
      var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
      chart.draw(data, options);
    }
    // drawChart();
  }, 20000);

}]);