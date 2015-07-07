'use strict';

angular.module('portalDemoApp')
	.controller('mainCtrl', ['constant', '$scope', 'usersSvc', 'testObj', 'testObj2', 'greeting', '$state', 'staticStorageSvc', '$timeout',
		function(constant, $scope, usersSvc, testObj, testObj2, greeting, $state, staticStorageSvc, $timeout) {
			console.log('in mainCtrl ...');
			console.log(staticStorageSvc.get(constant.userinfo));
			$scope.userid = staticStorageSvc.get(constant.userinfo).getUserId();
			$scope.$on('$viewContentLoaded', function(event) {
				console.log("view loaded !!!");
			});
			$scope.logout = function() {
				usersSvc.logout();
			}

			$scope.changeUser = function() {
				/*$timeout(function() {
					$scope.userid = "nimdA";
					console.log($scope.userid);
				}, 3000);*/
			}
			$scope.changeUser();
		}
	]);