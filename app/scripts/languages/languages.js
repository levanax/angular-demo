/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    INDEX_TITLE:'Test Secuiy',
    USER_LOGIN: 'User login',
    USER_NAME: 'User Name',
    USER_PASSWORD: 'password',
    FORGET_PASSWORD: 'forget password?',
    LOGIN:'Login',
    USER_NAME_EMPTY:'plz  enter your username.',
    PASSWORD_EMPTY:'plz  enter your password.'
  });
  $translateProvider.translations('cn',{
    INDEX_TITLE:'测试证券',
    USER_LOGIN: '用户登入',
    USER_NAME: '用户名',
    USER_PASSWORD: '密码',
    FORGET_PASSWORD: '忘记密码?',
    LOGIN:'登入',
    USER_NAME_EMPTY:'请输入用户名',
    PASSWORD_EMPTY:'请输入密码'
  } );


    /*$translateProvider.useStaticFilesLoader({
      prefix: 'scripts/languages/language-',
      suffix: '.json'
    });*/
  $translateProvider.preferredLanguage('cn');
});
