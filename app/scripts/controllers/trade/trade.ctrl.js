'use strict';

angular.module('portalDemoApp')
	.controller('tradeCtrl', ['$stateParams', 'staticStorageSvc', '$scope', '$state',
		function($stateParams, staticStorageSvc, $scope, $state) {
			$scope.$on('$viewContentLoaded', function(event) {
				//page loaded and page ui-view refresh exec
				$state.go('trade.' + $stateParams.target, {}, {
					inherit: true,
					location: false
				});
			});

			$scope.$on('refresh.order', function(e, params) {
				params['target'] = 'order';
				$state.go('trade.order', params, {
					reload: true,
					location: false,
					inherit: false
				});
			});

			$scope.$on('go.page', function(e, stateName, params) {
				$state.go(stateName, params, {
					reload: true,
					inherit: false
				});
			});

			$scope.$on('system.exit', function(e, params) {
				staticStorageSvc.clear();
				$state.go('login');
			});
		}
	]);