/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
.config(['$translateProvider',function ($translateProvider) {
	  $translateProvider.preferredLanguage('en');
  	  $translateProvider.useLoader('asyncLoaderLanguage');
}])
.factory('asyncLoaderLanguage', function ($q, $timeout) {
  return function (options) {
    var deferred = $q.defer(),
        translations;
 
    if (options.key === 'en') {
      translations = translations_EN;
    } else {
      translations = translations_CN;
    }
 
    $timeout(function () {
      deferred.resolve(translations);
    }, 100);
 
    return deferred.promise;
  };
});