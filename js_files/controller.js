var app = angular.module('app', ['ngRoute']);
//TODO kolla över routning
//TODO Presentera mer data om användaren
//TODO design
app.controller('ctrl', function($scope, $http, $location) {
  $scope.test_landning_page="The landning_page works"
  $scope.test_starship_search="The starship_search page works"
  $scope.test_create_user="The create_user page works"
  $scope.starships = getStarships();
  $scope.currencies = [];
  $scope.characters = getCharacters();
  $scope.okToCreateUser = false;
  $scope.UserInDb = false;
  $scope.NoFavs = false;
  $scope.Favs = getFav();
  $scope.currentUser = sessionStorage.getItem("User_name");

  if(sessionStorage.getItem("User_name") == null){
    $location.path("/landing_page");
  }

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
      $scope.currencies = response.data.rates;
    });

  $scope.createUser  = function() {
    var character = $scope.User.User_character;
    var name = $scope.User.User_name;

    $http.post("php_files/createUser.php", {
      'character': character,
      'name': name
    }).then(function(response){
      console.log(response);
      if (response.data == 1) {
        $scope.UserInDb = true;
        console.log("User already in DB");
      } else {
        $scope.UserInDb = false;
        console.log("Data successfully added");
      }
    })
  }

  $scope.getUser = function(name){
    $http.post("php_files/getUser.php", {
      'userName' : name
    }).then(function(response){
      console.log(response.data);
      if(response.data == 1) {
        //user does not exist
        $scope.okToCreateUser = true;
        console.log($scope.okToCreateUser);
      }
      else {
        //User exist
        sessionStorage.setItem("User_name", response.data[0].User_name);
        $scope.okToCreateUser = false;
        console.log(sessionStorage.getItem("User_name"));
        $location.path("/starship_search");
        getFav();
      }
    })
  }

  function getFav(){
    $http.post("php_files/getFav.php", {
      'userName' : sessionStorage.getItem("User_name")
    }).then(function(response){
      console.log("Get fav: " + response.data);
      if(response.data == 1){
        $scope.NoFavs = true;;
      } else{
        $scope.NoFavs = false;
      }
      $scope.Favs  = response.data;
      return $scope.Favs;
      console.log($scope.Favs);
    });
  }
  $scope.createFav = function(starshipName) {
    var name = sessionStorage.getItem("User_name");
    console.log(starshipName);
    $http.post("php_files/createFav.php", {
      'starship': starshipName,
      'name': name
    }).then(function(response){
      if(response.data == 1) {
        alert(starshipName + " already added to your favorites");
      }
      console.log(response.data);
      getFav();
    })
  }

  $scope.deleteFav = function(id){
    var name = sessionStorage.getItem("User_name");
    $http.post("php_files/deleteFav.php", {
      favId: id,
      name: name
    }).then(function(response){
      console.log(response);
      getFav();
    });
  }
});
