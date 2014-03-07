angular.module('directives.examples', [])

    /*
     PRIMITIVE RECURSIVE DIRECTIVE
     */
    .directive('collection', function () {
        return {
            restrict: "E",
            replace: true,
            scope: {
                collection: '='
            },
            template: "<ul><member ng-repeat='member in collection' member='member'></member></ul>"
        }
    })

    .directive('member', function ($compile) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                member: '='
            },
            template: "<li>{{member.name}}</li>",
            link: function (scope, element) {

                var collectionSt = '<collection collection="member.children"></collection>';

                if (angular.isArray(scope.member.children)) {

                    $compile(collectionSt)(scope, function (cloned) {
                        element.append(cloned);
                    });
                }
            }
        }
    })

    /*
     SIMPLE ACCORDION WIDGET
     */
    .directive('accordion', function () {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: "accordion.html",
            transclude: true,
            scope: { title: '='},
            link: function (scope, element) {

                angular.element(element.children()[0]).bind('click', function () {
                    scope.$apply(scope.open = !scope.open);
                });
            }
        }
    })


    .directive("miniNgView", function ($routeParams, $templateCache) {
        return {
            terminal: true,
            priority: 400,
            transclude: 'element',
            compile: function (element, attr, linker) {

                return function (scope, element) {

                    scope.$on('$routeChangeSuccess', function () {

                        var template = $routeParams.subView + '.html';
                        var content = $templateCache.get(template);

                        linker(scope, function (clone) {
                            clone.html(content);
                            element.parent().append(clone);
                        })
                    });
                }
            }
        }
    })


    .run(function ($templateCache) {

        $templateCache.put('accordion.html', "<div class='accordion'><h3>{{ title }}</h3>" +
            "<div class='accordion-content' ng-show='open' ng-transclude></div> " +
            "</div>");

        $templateCache.put('one.html', "<h3 class='text-primary'>Sub View One Content</h3><p>" +
            "is it that easy to create a multi view in angulr?</p>");

        $templateCache.put('two.html', "<h3 class='text-danger'>The Two Sub Menu Content</h3>" +
            "<p>Once you understand how directives work, all the magic disappear...</p> ");

    });