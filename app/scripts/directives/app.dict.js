'use strict';

angular.module("portalDemoApp")
	.directive('appCalendar', [
		function() {
			var directive = {
				restrict: 'EAC',
				template: function(eElement, tAttrs) {
					$(eElement).datetimepicker();
				}
			}
			return directive;
		}
	])
	.directive('appPopover', [
		function() {
			var directive = {
				restrict: 'EAC',
				template: function(eElement, tAttrs) {
					$(eElement).popover();
				}
			}
			return directive;
		}
	])
	.directive('appSwitch', [
		function() {
			var directive = {
				restrict: 'EAC',
				template: function(eElement, tAttrs) {
					$(eElement).bootstrapSwitch();
				}
			}
			return directive;
		}
	]);