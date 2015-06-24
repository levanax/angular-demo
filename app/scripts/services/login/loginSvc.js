/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

angular.module('portalDemoApp')
.factory('loginSvc',['$http','server',function($http,server){
    var service = {
      login:function(loginParams){
        return $http({
                method:'post',
                url:server.urlPrefix+'login/submit',
                data:loginParams,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
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
