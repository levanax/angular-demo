/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
.config(['$translateProvider',function ($translateProvider) {
	  $translateProvider.preferredLanguage('cn');
	  $translateProvider.useLoader('asyncLoaderLanguage');
    $translateProvider.useSanitizeValueStrategy(null);
}])
.factory('asyncLoaderLanguage', ['translations_cn','translations_en','$q','$timeout',function (translations_cn,translations_en,$q, $timeout) {
  return function (options) {
    var deferred = $q.defer(),
        translations_current;

    if (options.key === 'en') {
      translations_current = translations_en;
    } else {
      translations_current = translations_cn;
    }
 
    $timeout(function () {
      deferred.resolve(translations_current);
    }, 100);
 
    return deferred.promise;
  };
}]);