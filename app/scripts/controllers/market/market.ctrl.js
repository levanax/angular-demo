'use strict';

angular.module('portalDemoApp')
	.controller('marketCtrl', ['marketQuoteViewSvc', 'staticStorageSvc', '$scope', '$state',
		function(marketQuoteViewSvc, staticStorageSvc, $scope, $state) {
			$scope.$on('$viewContentLoaded', function(event) {
				//page loaded and page ui-view refresh exec
				$state.go('market.quote', {}, {
					location: false
				});
			});

			$scope.$on('go.page', function(e, stateName, params) {
				marketQuoteViewSvc.closeConnection();
				$state.go(stateName, params, {
					reload: true,
					inherit: false
				});
			});

			$scope.$on('system.exit', function(e, params) {
				marketQuoteViewSvc.closeConnection();
				staticStorageSvc.clear();
				$state.go('login');
			});
		}
	]);