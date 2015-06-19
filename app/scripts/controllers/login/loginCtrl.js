/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
  .controller('LoginCtrl', ['$scope','$rootScope','loginSvc','$state','$translate','constant', function ($scope,$rootScope,loginSvc,$state,$translate,constant) {
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
            console.log($rootScope);
            $rootScope.session.put(constant.userinfo,data[0]);
            $state.go('main',{},{reload:true});
         }else{
           //login failed.
         }
       });
      }
    };

    $scope.changeLanguage = function (langKey) {
     $translate.use(langKey);
   };
  }]);
