/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

angular.module('portalDemoApp')
.factory('usersSvc',['$http','server','dataStorageSvc',function($http,server,dataStorageSvc){
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
      },
      logout:function(){
        dataStorageSvc.session.clear();
        dataStorageSvc.local.clear();
        $state.go('login');
      }
    };
    return service;
  }]);
