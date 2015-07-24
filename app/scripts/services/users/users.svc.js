/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

angular.module('portalDemoApp')
  .factory('usersSvc', ['$filter','constant','usersDao','$http', '$state', 'server', 'dataStorageSvc',
    function($filter,constant,usersDao,$http, $state, server, dataStorageSvc) {
      var service = {
        login: function(scopePointer,loginParams) {
          usersDao.login(loginParams).then(function(data) {
            var user = data.UserLoginResponse.User;
            if (!data.UserLoginResponse.User.SysCode) {
              dataStorageSvc.session.clear();
              dataStorageSvc.local.clear();
              dataStorageSvc.session.put(constant.userinfo, data);
              $state.go('trade',{target:'order'});
            } else {
              //login failed.
              scopePointer.serverError = $filter('translate')('LOGIN.LOGIN_FAIL');
            }
          });
        },
        logout: function() {
          dataStorageSvc.session.clear();
          dataStorageSvc.local.clear();
          $state.go('login');
        }
      };
      return service;
    }
  ]);