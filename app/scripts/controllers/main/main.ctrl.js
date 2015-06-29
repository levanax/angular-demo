'use strict';

angular.module('portalDemoApp')
.controller('mainCtrl',['constant','$scope','usersSvc','testObj','testObj2','greeting','$state','dataStorageSvc',function(constant,$scope,usersSvc,testObj,testObj2,greeting,$state,dataStorageSvc){
	console.log('in mainCtrl ...');
	console.log();
	$scope.userid = dataStorageSvc.session.get(constant.userinfo).UserId;
	$scope.$on('$viewContentLoaded', function(event){
		console.log("view loaded !!!");
	});
	$scope.logout = function(){
		usersSvc.logout();
	}
}]);