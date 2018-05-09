var app = angular.module('app', ['ngRoute']);

app.controller('ctrl', function($scope, $http, $location) {
  $scope.test_landning_page="The landning_page works"
  $scope.test_starship_search="The starship_search page works"
  $scope.test_create_user="The create_user page works"

});
