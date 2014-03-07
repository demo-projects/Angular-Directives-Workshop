angular.module('directives.transclude', [])

    .directive('movieInfo', function () {

        return {
            scope: {
                'name': '=movieInfo'
            },

            transclude: true,

            template: '<div>' +
                '<h3>{{ name }}</h3>' +
                '<div ng-transclude></div> ' +
                '</div>'
        }

    })

    /*
     SIMPLE REPEAT DIRECTIVE EXAMPLE
     */
    .directive('nkRepeat', function () {

        return {
            transclude: 'element',

            link: function (scope, element, attr, ctrl, transFn) {

                var myLoop = attr.nkRepeat,
                    match = myLoop.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
                    index = match[1],
                    data = match[2],
                    parent = element.parent();

                scope.$watchCollection(data, function (collection) {

                    var i, block, childScope;

                    for (i = 0; i < collection.length; i++) {

                        childScope = scope.$new();
                        childScope[index] = collection[i];

                        transFn(childScope, function (clone) {

                            parent.append(clone);
                            block = {};
                            block.el = clone;
                            block.scope = childScope;
                        })
                    }
                })
            }
        }
    });