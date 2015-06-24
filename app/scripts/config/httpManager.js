/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

angular.module('portalDemoApp')
  .factory('httpInterceptor', ['$q','server',function($q,server) {
    return {
      'request': function(config) {
        console.log('in http request : config ...');
        console.log(config);
        if(config.headers.Accept !='text/html'){
          config.url = server.urlPrefix_test+config.url;
        }
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
}]);
angular.module('portalDemoApp')
  .config(['$httpProvider',function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('httpInterceptor');
  }]);
