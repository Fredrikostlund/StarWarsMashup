app.config(function($routeProvider){

  $routeProvider
  // .when('/', {
  //   templateUrl:"views/landing_page.html",
  //   controller: "ctrl"
  // })
  .when('/', {
    templateUrl: "views/intro.html",
    controller: "ctrl"
  })
  .when('/starship_search', {
    templateUrl:"views/starship_search.html",
    controller: "ctrl"
  })
  .when('/create_user', {
    templateUrl:"views/create_user.html",
    controller: "ctrl"
  })
  .otherwise({redirectTo:"/"});
});
