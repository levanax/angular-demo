/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
.config(['$translateProvider',function ($translateProvider) {

  $translateProvider.useStaticFilesLoader({
    prefix: 'languages/locale-',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
}]);
