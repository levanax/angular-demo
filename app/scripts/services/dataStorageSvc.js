'use strict';

angular.module('portalDemoApp')
.factory('dataStorageSvc',['$http','$rootScope',function($http,$rootScope){
    var service = {
      session:(function(){
          var put = function(key, value){
              sessionStorage.setItem(key,value);
          },
          remove = function(key){
              sessionStorage.removeItem(key);
          },
          get =  function(key){
              if(key){
                  return sessionStorage.getItem(key) || null;
              }else{
                  return null;
              }
          },
          clear = function(){
            sessionStorage.clear();
          };
          return {
              put:put,
              remove:remove,
              get:get,
              clear:clear
          };
      })(),
      local:(function(){
          var put = function(key, value){
              localStorage.setItem(key,value);
          },
          remove = function(key){
              localStorage.removeItem(key);
          },
          get =  function(key){
              if(key){
                  return localStorage.getItem(key) || null;
              }else{
                  return null;
              }
          },
          clear = function(){
            sessionStorage.clear();
          };
          return {
              put:put,
              remove:remove,
              get:get,
              clear:clear
          };
      })()
    };
    return service;
  }]);
