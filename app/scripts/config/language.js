/**
 * Created by Levana.Xue on 6/9/2015.
 * languages : cn / en
 */
'use strict';

angular.module('portalDemoApp')
  .config(['server', '$translateProvider',
    function(server, $translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'languages/locale-',
        suffix: '.json'
      });
      var preferredLanguage = (navigator.language || navigator.browserLanguage).toLowerCase();
      switch (preferredLanguage) {
        case 'zh-cn':
        case 'en-us':
          break;
        default:
          preferredLanguage = server.languages;
          break;
      }
      $translateProvider.preferredLanguage(preferredLanguage);
      $translateProvider.useSanitizeValueStrategy(null);
    }
  ]);