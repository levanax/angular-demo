/**
 * Created by Levana.Xue on 6/10/2015.
 */
'use strict';

angular.module("portalDemoApp")
	.directive('appPattern', [
		function() {
			var directive = {
				restrict: 'EAC',
				require: 'ngModel',
				link: function(scope, ele, attrs, c) {
					scope.$watch(attrs.ngModel, function(newValue, oldValue, scope) {});
				}
			}
			return directive;
		}
	]);