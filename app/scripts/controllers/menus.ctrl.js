'use strict';

angular.module('portalDemoApp')
	.controller('menusCtrl', ['staticStorageSvc', '$scope', '$state',
		function(staticStorageSvc, $scope, $state) {
			$scope.go = function(args) {
				var stateName = null;
				var params = null;
				switch (args) {
					case 'trade.order':
						stateName = "trade";
						params = {
							target: 'order'
						};
						break;
					case 'trade.orderBook':
						stateName = "trade";
						params = {
							target: 'orderBook'
						};
						break;
					case 'market.quote':
						stateName = "market";
						params = {
							target: 'quote'
						};
						break;
					case 'market.chart':
						stateName = "market";
						params = {
							target: 'chart'
						};
						break;
				}
				$scope.$emit('go.page', stateName, params);
			}

			$scope.exit = function() {
				$scope.$emit('system.exit');
			}
		}
	]);