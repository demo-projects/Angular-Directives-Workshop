angular.module('directives.controllers', [])

    .directive('nkCtrl', function ($log) {
        return {
            restrict: 'E',
            controller: function ($scope, $element, $attrs) {

                $log.happy("nkCtrl Controller ready", "blue");

                $scope.print = function (object, table) {

                    var printOut = function (obj) {
                        if (table) {
                            console.table(obj);
                        } else {
                            console.log(obj);
                        }
                    };

                    switch (object) {
                        case '$scope':
                            printOut($scope);
                            break;
                        case '$element':
                            printOut($element);
                            break;
                        case '$element__proto__':
                            printOut($element__proto__);
                            break;
                        case '$attrs':
                            printOut($attrs);
                            break;

                        case '$attrs__proto__':
                            printOut($attrs.__proto__);
                            break;
                    }
                }
            },
            templateUrl: "ctrl.html",
            compile: function () {
                $log.happy("nkCtrl Compile", "red");
                return {
                    pre: function () {
                        $log.happy("nkCtrl Pre Linking", "orange")
                    },
                    post: function () {
                        $log.happy("nkCtrl Post Linking", "green");
                    }
                }
            }
        }
    })


    .directive('nkAttr', function ($log) {
        return {
            restrict: 'E',
            templateUrl: 'nkattr.html',
            controller: function ($scope, $element, $attrs) {

                $scope.info = $attrs.info;

                $attrs.$observe('info', function () {
                    $log.happy("Attribute info changed.", "blue");
                });

                $scope.addClass = function () {
                    $attrs.$addClass('my-class');
                };

                $scope.removeClass = function () {
                    $attrs.$removeClass('my-class');
                };

                $scope.updateClass = function () {
                    console.log("not in this version of angular");

                };

                $scope.setValue = function () {
                    $attrs.$set('info', 'new info')
                }
            }


        }
    })

    .directive('nkComponent', function ($log) {

        return {
            restrict: 'E',
            controller: function () {
                this.action = function () {
                    $log.happy("Method on nkComponent directive", "blue");
                }
            }
        }
    })


    .directive('nkPanel', function () {

        return {
            restrict: 'A',
            require: 'nkComponent',
            link: function (scope, elemnt, attr, ctrl) {
                scope.action = function () {
                    ctrl.action();
                };

            },
            template: "<button class='btn btn-danger' ng-click='action()'>click from panel</button>" +
                "<p ng-transclude></p> ",
            transclude: true
        }
    })


    .directive('nkButton', function () {

        return {
            restrict: 'E',
            require: '^nkComponent',
            link: function (scope, element, attr, ctrl) {
                scope.action = function () {
                    ctrl.action();
                }
            },
            template: "<button class='btn btn-success' ng-click='action()'>click from button</button> "
        }
    })


    .directive('nkModel', function ($log) {

        return {
            restrict: 'E',
            require: 'ngModel',
            transclude: true,
            link: function (scope, element, attrs, ctrl) {

                ctrl.$render = function () {
                    element.html(ctrl.$viewValue || 'default value');
                };

            }
        }
    })

    .run(function ($templateCache) {
        $templateCache.put('ctrl.html', "<div><input type='text' ng-model='objName'>" +
            "&nbsp;&nbsp;<input type='checkbox' ng-model='table'>&nbsp;table" +
            "&nbsp;&nbsp;<button ng-click='print(objName, table)' class='btn btn-primary'>print</button> </div>");

        $templateCache.put('nkattr.html', "<div><p class='lead'>{{ info }}</p>" +
            "<span class='btn btn-success' ng-click='addClass()'>Add my-class</span>" +
            "<span class='btn btn-danger' data-ng-click='removeClass()'>Remove my-class </span>" +
            "<span class='btn btn-warning' ng-click='updateClass()'>Update to my-other-class</span>" +
            "<span class='btn btn-primary' ng-click='setValue()'>Set value to newValue</span>  " +
            "</div>");
    });