/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
  .controller('LoginCtrl', ['$scope','loginSvc','$state', function ($scope,loginSvc,$state) {
    $scope.submitted = false;
    $scope.interacted = function(field) {
      return $scope.submitted || field.$dirty;
    };

    $scope.submit = function() {
      $scope.submitted = true;
      if($scope.loginForm.$valid){
       loginSvc.login($scope.userinfo).then(function(data){
         console.log(data);
         if(data[0].success){
           $state.go('main');
         }else{
           alert('login failed.')
         }
       });
      }
    };
  }]);
