'use strict';

angular.module('portalDemoApp')
.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
  var omnipotentState = {
      name:'info',
      url:'/info/{businessName}',
      templateUrl:function($stateParams){
        return 'views/info/'+$stateParams.businessName +'.html';
      },
      controller:function($scope){

      }
    };
  var loginState = {
      name:'login',
      url:'/index',
      templateUrl: 'views/login/login.html',
      controller: 'LoginCtrl'
    };
  var mainState = {
      name:'main',
      url:'/main',
      templateUrl: 'views/main/main.html',
      controller: 'mainCtrl',
      resolve:{
        testObj:function(){
           /*return $http({method: 'post', url: 'api'})
-               .then (function (data) {
-                   return data;
-               });*/
          return "TEST TEST TEST .";
        },
        testObj2:function(){
          return "TEST TEST TEST .";
        },
        greeting:['$q','$timeout',function($q, $timeout){
             var deferred = $q.defer();
             $timeout(function() {
                 deferred.resolve('Hello!');
             }, 1000);
             return deferred.promise;
      }],
      onEnter:['testObj2',function(testObj2){
        if(testObj2){
          // can't change value
        }
      }]
    }
  };
  $stateProvider
    .state(omnipotentState)
    .state(loginState)
    .state(mainState);
}]);
