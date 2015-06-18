'use strict';

angular.module('portalDemoApp')
.controller('mainCtrl',function($scope,testObj,testObj2,greeting,$state){
	console.log('in mainCtrl ...');
	console.log(testObj);
	console.log("data: "+testObj2);
	console.log('-------greeting------------');
	console.log(greeting);
	
	console.log("----$state----");
	console.log($state);
	$scope.$on('$viewContentLoaded', function(event){
		console.log("view loaded !!!");
	});
});