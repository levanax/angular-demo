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
	])
	.directive('appOrderSide', [

		function() {
			var directive = {
				restrict: 'EAC',
				scope: true,
				link: function(scope, ele, attrs) {
					scope.$watch(attrs.variable, function(newValue, oldValue, scope) {
						if (typeof newValue === 'string') {
							switch (newValue) {
								case 'B':
									$(ele).find('div.sellSide').removeClass("red-line");
									$(ele).find('div.buySide').addClass("red-line");
									break;
								case 'S':
									$(ele).find('div.buySide').removeClass("red-line");
									$(ele).find('div.sellSide').addClass("red-line");
									break;
								default:
									console.info('not found value');
									break;
							}
						}
					});

					$(ele).find('div.buySide').on('click', function() {
						scope.$apply(function() {
							scope.$parent[attrs.variable] = "B";
						})
					})
					$(ele).find('div.sellSide').on('click', function() {
						scope.$apply(function() {
							scope.$parent[attrs.variable] = "S";
						})
					})
				}
			}
			return directive;
		}
	])
	.directive('appStockInput', [

		function() {
			var directive = {
				restrict: 'EAC',
				link: function(scope, ele, attrs) {
					/*$(ele).keydown(function(event) {
						if (event.keyCode == "13") {
							this.blur();
						}
					})*/
				}
			}
			return directive;
		}
	]);