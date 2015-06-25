/**
 * must use angular-cookies 1.4.1 version. other version have problem
 * note: max storage bytes 4096.
 */
'use strict';

angular.module('portalDemoApp')
.factory('dataStorageSvc',['$cookieStore',function($cookieStore){
    /*var cookieHistory = [];*/
    var service = {
      session:(function(){
          var put = function(key, value){
              $cookieStore.put(key,value);
          },
          remove = function(key){
              $cookieStore.remove(key);
          },
          get =  function(key){
              var result = $cookieStore.get(key);
              if(!angular.isUndefined(result)){
                return result;
              }
              return null;
          },
          clear = function(){
            //do something ..
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
          },
          remove = function(key){
          },
          get =  function(key){
          },
          clear = function(){
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
