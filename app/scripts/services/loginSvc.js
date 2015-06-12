/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

angular.module("portalDemoApp")
.factory('loginSvc',function($http){
    var service = {
      login:function(loginParams){
        return $http({
                method:'post',
                url:'LoginAction',
                params:loginParams
              }).then(function(result) {
                  return result.data;
              });
      }
    };
    return service;
  });
