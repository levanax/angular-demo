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
	.directive('appEnterKey', [

		function() {
			/**
			 * use this ,可能会影响 当前input 中 ng-keydown event
			 */
			var directive = {
				restrict: 'EAC',
				link: function(scope, ele, attrs) {
					$(ele).keydown(function(event) {
						if (event.keyCode == "13") {
							this.blur();
						}
					})
				}
			}
			return directive;
		}
	])
	.directive('appTabNext', [

		function() {
			/**
			 * use this ,可能会影响 当前input 中 ng-keydown event
			 * use e.g. :  data-app-tab-next="#orderPrice"
			 */
			var directive = {
				restrict: 'EAC',
				require: ['?ngModel'],
				link: function(scope, ele, attrs, ngModel) {
					var model = ngModel[0];
					$(ele).keydown(function(event) {
						//值通过验证 才可以 滚动焦点
						if (!model.$invalid && event.keyCode == "13") {
							//event.preventDefault();
							//$(attrs.appTabNext).focus();
							// var windowHeight = document.documentElement.clientHeight;
							// var footHeight = $(".panelFooter").height();
							// document.body.style.height = util.add(windowHeight,footHeight) + 'px';
						}
					})
				}
			}
			return directive;
		}
	]);