var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    templateUrl : "/partials/login.html",
    controller: "sessionController"
  })
  .when("/dashboard", {
    templateUrl : "/partials/dashboard.html",
    controller: "appointmentController"
  })
  .when("/appointment/new", {
    templateUrl: "/partials/appointment.html",
    controller: "appointmentController"
  })
  .otherwise({
      redirectTo: "/"
  })

});
