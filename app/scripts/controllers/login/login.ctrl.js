/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
  .controller('LoginCtrl', ['$scope', '$filter', '$rootScope', 'usersSvc', '$state', '$translate', 'constant', 'dataStorageSvc',
    function($scope, $filter, $rootScope, usersSvc, $state, $translate, constant, dataStorageSvc) {
      $scope.submitted = false;
      $scope.interacted = function(field) {
        return $scope.submitted || field.$dirty;
      };

      $scope.submit = function() {
        $scope.serverError = '';
        $scope.submitted = true;
        if ($scope.loginForm.$valid) {
          usersSvc.login({
            name: $scope.userinfo.userName,
            password: $scope.userinfo.password
          }).then(function(data) {
            console.log(data);
            var user = data.UserLoginResponse.User;
            if (!data.UserLoginResponse.User.SysCode) {
              dataStorageSvc.session.put(constant.userinfo, data);
              $state.go('trade');
            } else {
              //login failed.
              $scope.serverError = $filter('translate')('LOGIN.LOGIN_FAIL');
            }
          });
        }
      };

      $scope.changeLanguage = function(langKey) {
        $translate.use(langKey);
      };
    }
  ]);