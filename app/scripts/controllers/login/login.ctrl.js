/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
  .controller('LoginCtrl', ['appRuleSvc', '$scope', '$filter', '$rootScope', 'usersSvc', '$state', '$translate', 'constant', 'dataStorageSvc',
    function(appRuleSvc, $scope, $filter, $rootScope, usersSvc, $state, $translate, constant, dataStorageSvc) {
      appRuleSvc.test('test');
      $scope.submitted = false;
      $scope.interacted = function(field) {
        return $scope.submitted || field.$dirty;
      };

      $scope.submit = function() {
        $scope.serverError = '';
        $scope.submitted = true;
        if ($scope.loginForm.$valid) {
          var params = {
            name: $scope.userinfo.userName,
            password: $scope.userinfo.password
          }
          var scopePointer = $scope;
          usersSvc.login(scopePointer, params);
        }
      };

      $scope.changeLanguage = function(langKey) {
        $translate.use(langKey);
      };
    }
  ]);