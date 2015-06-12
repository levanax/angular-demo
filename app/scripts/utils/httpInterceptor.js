/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

angular.module('portalDemoApp')
  .factory('httpInterceptor', function($q) {
    return {
      'request': function(config) {
        return config;
      },
      'requestError': function(rejection) {
        return $q.reject(rejection);
      },
      'response': function(response) {
        return response;
      },
      'responseError': function(rejection) {
        console.error('request error .');
        return $q.reject(rejection);
      }
    };
});
angular.module('portalDemoApp')
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  });
