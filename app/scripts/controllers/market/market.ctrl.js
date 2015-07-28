'use strict';

angular.module('portalDemoApp')
	.controller('marketCtrl', ['$stateParams','marketQuoteViewSvc', 'staticStorageSvc', '$scope', '$state',
		function($stateParams,marketQuoteViewSvc, staticStorageSvc, $scope, $state) {
			$scope.$on('$viewContentLoaded', function(event) {
				//page loaded and page ui-view refresh exec
				$state.go('market.' + $stateParams.target, {}, {
					inherit: true,
					location: false
				});
			});

			$scope.$on('go.page', function(e, stateName, params) {
				marketQuoteViewSvc.closeConnection();
				echartsClient.leave();
				$state.go(stateName, params, {
					reload: true,
					inherit: false
				});
			});

			$scope.$on('system.exit', function(e, params) {
				marketQuoteViewSvc.closeConnection();
				echartsClient.leave();
				staticStorageSvc.clear();
				$state.go('login');
			});
		}
	]);