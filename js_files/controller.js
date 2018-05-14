var app = angular.module('app', ['ngRoute']);

app.controller('ctrl', function($scope, $http, $location) {
  $scope.test_landning_page="The landning_page works"
  $scope.test_starship_search="The starship_search page works"
  $scope.test_create_user="The create_user page works"

  $scope.starships = getStarships();
  $scope.currencies = [];
  $scope.characters = getCharacters();

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
      pageNr+= 1;
    }
  }

  function getCharacters(){
    var pageNr = 1;
    var characterArray = [];
    while(pageNr < 10){
      $http({
        method: 'GET',
        url: 'https://swapi.co/api/people/?page=' + pageNr,
      }).then(function(response){
        angular.forEach(response.data.results,function(value,index){
          characterArray.push(value);
        });
      });
      if(pageNr == 9){
        return characterArray;
      }
      pageNr+= 1;
    }
  }

    $http({
      method: 'GET',
      url: 'http://data.fixer.io/api/latest',
      params:{
        access_key: '02aacf6725af847bc2910eb143d3b61b',
      }
    }).then(function(response){
      console.log(response.data.rates);
      $scope.currencies = response.data.rates;
      console.log($scope.currencies);
    });

  $scope.createUser  = function() {
    console.log($scope.User.User_character);
    console.log($scope.User.User_name);
    $http.post("php_files/createUser.php", {
      //TODO make sure connection to html is correct
      'character': $scope.User.User_character,
      'name': $scope.User.User_name
    }).then(function(response){
      console.log(response);
    })
  }

  $scope.getUser = function(name){
    $http.post("php_files/getUser.php", {
      'userName' : name
    }).then(function(response)){
      console.log(response.data);
    }
  }
});
