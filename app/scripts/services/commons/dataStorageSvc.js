'use strict';

angular.module('portalDemoApp')
.factory('dataStorageSvc',[function(){
    var service = {
      session:(function(){
          var put = function(key, value){
              var valueTemp = angular.toJson(value,false);
              sessionStorage.setItem(key,valueTemp);
          },
          remove = function(key){
              sessionStorage.removeItem(key);
          },
          get =  function(key){
              var result = sessionStorage.getItem(key);
              if(!angular.isUndefined(result)){
                return angular.fromJson(result);
              }
              return null;
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
              var valueTemp = angular.toJson(value,false);
              localStorage.setItem(key,valueTemp);
          },
          remove = function(key){
              localStorage.removeItem(key);
          },
          get =  function(key){
              if(!angular.isUndefined(key)){
                  var result = localStorage.getItem(key);
                  if(!angular.isUndefined(result)){
                    return angular.fromJson(result);
                  }
              }
              return null;
          },
          clear = function(){
            localStorage.clear();
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
