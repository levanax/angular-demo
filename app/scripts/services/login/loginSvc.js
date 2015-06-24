/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

angular.module('portalDemoApp')
.factory('loginSvc',['$http',function($http){
    var service = {
      login:function(loginParams){
        return $http({
                method:'post',
                url:'login/submit',
                data:loginParams,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest:function(data){
                  return $.param(data);
                }
              }).then(function(result) {
                  return result.data;
              });
      }
    };
    return service;
  }]);
