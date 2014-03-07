angular.module('directives.compileAndLink', [])

    /*
     Multiple directives on the same node
     */
    .directive('component', function ($log) {

        return {

            restrict: 'E',
            compile: function () {
                $log.happy("Component Compile", "blue");
                return {
                    pre: function () {
                        $log.happy("Component Pre-Link", "blue")
                    },
                    post: function () {
                        $log.happy("Component Link", "blue")
                    }
                }
            }
        }
    })

    .directive('frame', function ($log) {

        return {
            compile: function () {
                $log.happy("Frame Compile", "green")
                return {
                    pre: function () {
                        $log.happy("Frame Pre-Link", "green")
                    },
                    post: function () {
                        $log.happy("Frame Link", "green")
                    }
                }
            }
        }
    })

    .directive('panel', function ($log) {

        return {
            compile: function () {
                $log.happy("Panel Compile", "red");
                return {
                    pre: function () {
                        $log.happy("Panel Pre-Link", "red")
                    },
                    post: function () {
                        $log.happy("Panel Link", "red")
                    }
                }
            }
        }
    })

    /*
     directives tree on separate nodes
     */
    .directive('parent', function ($log) {
        return {
            restrict: 'E',
            compile: function () {
                $log.happy("Parent Compile", "blue");
                return {
                    pre: function () {
                        $log.happy("Parent Pre Link", "blue")
                    },
                    post: function () {
                        $log.happy("Parent Link", "blue")
                    }
                }
            }
        }
    })

    .directive('child', function ($log) {
        return {
            restrict: 'E',
            compile: function () {
                $log.happy("Child Compile", "red");
                return {
                    pre: function () {
                        $log.happy("Child Pre Link", "red")
                    },
                    post: function () {
                        $log.happy("Child Link", "red")
                    }
                }
            }
        }
    })

    .directive('grantChild', function ($log) {
        return {
            restrict: 'E',
            compile: function () {
                $log.happy("Grand Child Compile", "green");
                return {
                    pre: function () {
                        $log.happy("Grand Child Pre Link", "green")
                    },
                    post: function () {
                        $log.happy("Grand Child Link", "green")
                    }
                }
            }
        }
    });