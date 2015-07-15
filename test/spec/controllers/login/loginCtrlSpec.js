'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('portalDemoApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.submitted).toEqual(false);
    scope.userinfo ={
      userName:'mftst06',
      password:'12345678'
    };
    scope.loginForm = {
      $valid:true
    };
    scope.submit();

  });
});
