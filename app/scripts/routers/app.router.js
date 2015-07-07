/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
  .provider('appRuleSvc',{
    $get:function(){
      return {
        'test1':'test0000'
      };
    }
  })
  .config(['$urlRouterProvider', 'constant', 'appRuleSvcProvider',
    function($urlRouterProvider, constant, appRuleSvcProvider) {
      $urlRouterProvider.otherwise('/index');
      $urlRouterProvider.rule(function($injector, $location) {
        //what this function returns will be set as the $location.url
        console.log(appRuleSvcProvider);
        console.log('------------------in rule --------------');
        var path = $location.path();

        if (path == "/main") {
          //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
          //$location.replace().path('/index');
        }
        // because we've returned nothing, no state change occurs
      });
    }
  ]);