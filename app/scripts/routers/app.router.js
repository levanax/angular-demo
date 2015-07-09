/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
  .provider('appRuleSvc', function() {
      var text = 'see me ,';
      this.setText = function(input) {
        text = input;
      }
      this.$get = function() {
        return {
          test: function(input) {
            console.log(text + input);
          }}
        }
      })
    .config(['$urlRouterProvider', 'constant', 'appRuleSvcProvider',
      function($urlRouterProvider, constant, appRuleSvcProvider) {
        $urlRouterProvider.otherwise('/index');
        $urlRouterProvider.rule(function($injector, $location) {
          //what this function returns will be set as the $location.url
          appRuleSvcProvider.setText("hi , see me , ");
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