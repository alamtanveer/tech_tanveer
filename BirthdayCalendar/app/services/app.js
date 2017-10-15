var mainApp = angular.module("myApp", ['ngRoute','ngAnimate','ngSanitize']); 

mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: './app/template/main.html'
        , controller: 'mainController'
    }).    
    otherwise({
        redirectTo: '/'

    });
         }]);

