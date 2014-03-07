angular.module('app.controllers', [])

    /*
     OVERVIEW PAGE CONTROLLER
     */
    .controller('overviewCtrl', function ($scope, $log) {

        $scope.clearConsole = function () {
            $log.clear();
        };


        $scope.data = {
            title: 'Im the Overview Controller Scope',
            desc: 'I control the scope for this page',
            printScopeId: function (id) {
                $log.happy("Current scope id: " + id, "blue");
            }
        }
    })


    /*
     COMPILE AND LINK PAGE CONTROLLER
     */
    .controller('compileCtrl', function ($scope, $log) {

//        $log.clear();

        $scope.demo = {
            directive: 'none'
        };

        $scope.showDemo = function (demo) {
            $scope.demo.directive = demo;
        }
    })

    /*
     SCOPE PAGE CONTROLLER
     */
    .controller('scopeCtrl', function ($log) {

        $log.clear();

        this.book = {
            id: 2556433,
            title: "Oh My Scope",
            author: "Foo bar",
            category: "Drama",
            description: "This book describes how to develop directives un depth"
        };

        this.getBook = function () {
            return this.book;
        };

        this.getTitle = function () {
            return this.book.title;
        };

        this.setTitle = function (title) {
            this.book.title = title;
        };


    })

    /*
     CONTROLLER PAGE CONTROLLER
     */
    .controller('controllersCtrl', function ($log) {

//        $log.clear();
    })

    /*
     TRANSCLUDE PAGE CONTROLLER
     */
    .controller('transCtrl', function ($scope) {

        $scope.week = ['sunday', 'monday', 'tuesday', 'wednesday', 'tuesday', 'friday', 'saturday'];

    })

    /*
     EXAMPLE PAGE CONTROLLER
     */
    .controller('exampleCtrl', function ($scope, $rootScope) {

        $scope.data = [
            {
                name: 'Europe',
                children: [
                    {
                        name: 'Italy',
                        children: [
                            {    name: 'Rome' },
                            {    name: 'Milan'    }
                        ]},
                    {    name: 'Spain'}
                ]
            },

            {
                name: 'South America',
                children: [
                    {    name: 'Brazil'   },
                    {    name: 'Peru' }
                ]
            }
        ];

        $scope.accordionTitle = "Accordion Title!";


    });

