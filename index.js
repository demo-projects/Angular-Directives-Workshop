angular.module('App', ['ngRoute', 'app.directives', 'app.controllers'], function ($routeProvider, $provide) {

    $routeProvider
        .when('/welcome',
        {
            templateUrl: "views/00-welcome.html"
        })

        .when('/overview',
        {
            templateUrl: "views/01-overview.html",
            controller: "overviewCtrl"
        })

        .when('/compile',
        {
            templateUrl: "views/02-compile.html",
            controller: "compileCtrl"
        })

        .when('/scope',
        {
            templateUrl: "views/03-scope.html",
            controller: "scopeCtrl as library"
        })

        .when('/controllers',
        {
            templateUrl: "views/04-controllers.html",
            controller: "controllersCtrl"
        })

        .when('/transclude',
        {
            templateUrl: "views/05-transclude.html",
            controller: "transCtrl"
        })

        .when('/examples',
        {
            templateUrl: "views/06-examples.html",
            controller: 'exampleCtrl'
        })

        .when('/examples/:subView',
        {
            templateUrl: "views/06-examples.html",
            controller: 'exampleCtrl'
        })

        .otherwise({redirectTo: '/welcome'});

    /**
     * add some styling to log service
     */
    $provide.decorator('$log', function ($delegate) {

        $delegate.clear = function () {
            console.clear();
        };

        $delegate.happy = function (msg, color) {
            console.log("%c" + msg, "color:" + color + "; font-size: 22px; font-weight: bold;")
        };
        return $delegate
    })
})

    .run(function ($log) {
        $log.clear();
    });