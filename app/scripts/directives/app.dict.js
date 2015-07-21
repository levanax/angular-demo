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
	])
	.directive('appModal', [

		function() {
			var directive = {
				restrict: 'EAC',
				scope: true,
				link: function(scope, ele, attrs) {
					scope.$watch(attrs.visible, function(value) {
						if (value == true)
							$(ele).modal('show');
						else
							$(ele).modal('hide');
					});

					$(ele).on('shown.bs.modal', function() {
						scope.$apply(function() {
							scope.$parent[attrs.visible] = true;
						});
					});

					$(ele).on('hidden.bs.modal', function() {
						scope.$apply(function() {
							scope.$parent[attrs.visible] = false;
						});
					});
				}
			}
			return directive;
		}
	]);