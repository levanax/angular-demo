/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

angular.module('portalDemoApp')
  .factory('httpInterceptor', ['$q', 'server',
    function($q, server) {
      return {
        'request': function(config) {
          return config;
        },
        'requestError': function(rejection) {
          return $q.reject(rejection);
        },
        'response': function(response) {
          var data = response.data;
          if (typeof data.Reject !== 'undefined') {
            console.error('----------------------RESPONSE ERROR--------------------------------');
            console.error('response error : ' + data.Reject.SysMsg);
          }
          return response;
        },
        'responseError': function(rejection) {
          console.error('request error .');
          return $q.reject(rejection);
        }
      };
    }
  ]);
angular.module('portalDemoApp')
  .config(['$httpProvider',
    function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      $httpProvider.defaults.headers.post = headers;
      $httpProvider.defaults.headers.get = headers;

      $httpProvider.interceptors.push('httpInterceptor');
    }
  ]);