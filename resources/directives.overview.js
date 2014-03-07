angular.module('directives.overview', [])

    /*
     we define the directive name in camelCase and call
     it in snake-case in our view
     */
    .directive('myDirective', function ($log) {
        return function () {
            $log.happy("myDirective live!", "blue");
        }
    })

    .directive('myDirectiveAttach', function ($log) {
        return {
            restrict: 'ECMA',
            replace: true,
            template: "<span class='text-green'>myDirectivAttache template</span> ",
            link: function () {
                $log.happy("myDirectivAttache live!", "green");
            }
        }
    })


    /*
     Priority and Terminal - when several directives shares the same DOM
     Element, we can control the sequence of compiling with the priority
     */
    .directive('first', function ($log) {
        return {
            priority: 3,
            compile: function () {
                return {
                    pre: function () {
                        $log.happy("FIRST DIRECTIVE COMPILED", "blue");
                    }
                }
            }
        }
    })

    .directive('second', function ($log) {
        return {
            priority: 2,
            compile: function () {
                return {
                    pre: function () {
                        $log.happy("SECOND DIRECTIVE COMPILED", "red");
                    }
                }
            }
        }
    })

    .directive('third', function ($log) {
        return {
            priority: 1,
            compile: function () {
                return {
                    pre: function () {
                        $log.happy("THIRD DIRECTIVE COMPILED", "green");
                    }
                }
            }
        }
    })

    /*
     Template and replace - if our directive needs a template, we can define
     it in two ways: inline html or external html
     */
    .directive('inlineTemplate', function () {
        return {
            template: "<button class='btn btn-primary btn-lg'>in line template</button>"

        }
    })

    .directive('externalTemplate', function () {
        return {
            templateUrl: "button.html"
        }

    })

    .directive('replaceTemplate', function () {
        return {
            replace: true,
            templateUrl: "replace.html"
        }

    })


    /*
     Compile and link - the two phases of the directive life.
     */
    .directive('compileAndLink', function ($log) {

        return {

            compile: function () {
                $log.happy("First I Will Compile", "red");

                return {

                    pre: function () {
                        $log.happy("Then I Will run a Pre-Link code", "blue");
                    },

                    post: function () {
                        $log.happy("Finally I Will Link", "green")
                    }
                }
            }
        }
    })

    /*
     Scope and directives - demo of our three options
     of controlling scope in our directive
     */
    .directive('sameScope', function ($log) {
        return {
            scope: false,
            replace: true,
            templateUrl: 'sameScope.html',
            link: function (scope) {
                scope.printScope = function () {
                    $log.happy("My Scope Id: " + scope.$id, "green");
                    console.log(scope);
                    console.log(scope.data.title);
                }
            }
        }
    })

    .directive('childScope', function ($log) {
        return {
            scope: true,
            replace: true,
            templateUrl: 'childScope.html',
            link: function (scope) {
                scope.printScope = function () {
                    $log.happy("My Scope Id: " + scope.$id, "green");
                    console.log(scope);
                    console.log(scope.data.title);
                }
            }

        }
    })

    .directive('isolatedScope', function ($log) {
        return {
            scope: {},
            replace: true,
            templateUrl: 'isolatedScope.html',
            link: function (scope) {
                scope.printScope = function () {
                    $log.happy("My Scope Id: " + scope.$id, "green");
                    console.log(scope);
                    console.log(scope.data.title);
                }
            }
        }
    })

    /*
     Controllers and require in directives
     */
    .directive('parentDirective', function ($log) {
        return {
            restrict: 'E',
            controller: function () {
                this.printMsg = function () {
                    $log.happy("Hello From Parent Directive!", "green");
                }
            }
        }
    })

    .directive('childDirective', function ($log) {
        return {
            require: 'parentDirective',
            template: "<button class='btn btn-success btn-lg'>Click</button>",
            replace: true,
            link: function (scope, element, attr, ctrl) {
                element.on('click', function () {
                    ctrl.printMsg();
                })
            }
        }
    })


    .run(function ($templateCache) {

        $templateCache.put('button.html', '<button class="btn btn-success btn-lg">external template</button>');
        $templateCache.put('replace.html', '<button class="btn btn-info btn-lg">replace template</button>');

        $templateCache.put('sameScope.html', "<button class='btn btn-success' ng-click='printScope()'>Scope = False</button>");
        $templateCache.put('childScope.html', "<button class='btn btn-danger' ng-click='printScope()'>Scope = True</button>");
        $templateCache.put('isolatedScope.html', "<button class='btn btn-warning' ng-click='printScope()'>Scope = {}</button>");


    });

