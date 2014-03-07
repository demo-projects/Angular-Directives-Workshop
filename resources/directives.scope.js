angular.module('directives.scope', [])

	/*
	Read Only Directive
	 */
	.directive('nkBook', function ($log) {

		return {
			scope: {
				theTitle: '@title'
			},

			template: "<span class='lead'>Book Title is: {{ theTitle }}</span> "
		}
	})

	/*
	Two Way Binding Directive
	 */
	.directive('nkTitle', function ($log) {

		return {
			scope: {
				theTitle: '=title'
			},

			template: "<span class='lead'>Book Title is: <input type='text' ng-model='theTitle'/></span> "
		}
	})

	.directive('nkSetter', function ($log) {

		return {
			scope: {
				setNewTitle: '&action'
			},

			templateUrl: "nkSetter.html"
		}
	})


	.run(function ($templateCache) {

		$templateCache.put('nkSetter.html',"" +
			"<div><input class='input-lg' ng-model='title'/>" +
			"<button class='btn btn-default' ng-click='setNewTitle({newTitle : title})'>set</button>" +
			"</div>")

	});

