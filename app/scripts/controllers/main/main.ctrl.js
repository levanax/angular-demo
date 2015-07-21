'use strict';

angular.module('portalDemoApp')
	.controller('mainCtrl', ['$translate','constant', '$scope', 'usersSvc', 'testObj', 'testObj2', 'greeting', '$state', 'staticStorageSvc', '$timeout',
		function($translate,constant, $scope, usersSvc, testObj, testObj2, greeting, $state, staticStorageSvc, $timeout) {
			console.log('in mainCtrl ...');
			console.log(staticStorageSvc.get(constant.userinfo));
			$scope.userid = staticStorageSvc.get(constant.userinfo).getUserId();
			$scope.$on('$viewContentLoaded', function(event) {
				console.log("view loaded !!!");
			});
			$scope.logout = function() {
				usersSvc.logout();
			}

			$scope.changeLanguage = function(langKey) {
				$translate.use(langKey);
			}
		}
	]);