'use strict';

angular.module('portalDemoApp')
.controller('mainCtrl',['constant','$scope','usersSvc','testObj','testObj2','greeting','$state','dataStorageSvc','$timeout',function(constant,$scope,usersSvc,testObj,testObj2,greeting,$state,dataStorageSvc,$timeout){
	console.log('in mainCtrl ...');
	console.log();
	$scope.userid  = "Admin";
	//$scope.userid = dataStorageSvc.session.get(constant.userinfo).UserId;
	$scope.$on('$viewContentLoaded', function(event){
		console.log("view loaded !!!");
	});
	$scope.logout = function(){
		usersSvc.logout();
	}

	$scope.changeUser = function(){
			$timeout(function(){
			$scope.userid = "nimdA";
			console.log($scope.userid);
			},3000);
	}
	$scope.changeUser();
}]);