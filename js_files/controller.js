var app = angular.module('app', ['ngRoute']);

app.controller('ctrl', function($scope, $http, $location) {
  $scope.test_landning_page="The landning_page works"
  $scope.test_starship_search="The starship_search page works"
  $scope.test_create_user="The create_user page works"

  $scope.starships = getStarships();

  function getStarships(){
    var pageNr = 1;
    var starshipArray = [];
    while(pageNr < 5){
      $http({
        method: 'GET',
        url: 'https://swapi.co/api/starships/?page=' + pageNr,
      }).then(function(response){
        angular.forEach(response.data.results,function(value,index){
          starshipArray.push(value);
        });
      });
      if(pageNr == 4){
        return starshipArray;
      }
      pageNr=pageNr + 1;
    }
  }

  $scope.log = function(){
    console.log("starships inne:" + $scope.starships);
  }





});
