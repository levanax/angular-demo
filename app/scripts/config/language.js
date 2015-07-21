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
      var language = navigator.language || navigator.browserLanguage || server.languages;
      var preferredLanguage = language.toLowerCase();
      if ( ! util.isIntheArray(server.supportLanguages, preferredLanguage)) {
        preferredLanguage = server.languages;
      }
      $translateProvider.preferredLanguage(preferredLanguage);
      $translateProvider.useSanitizeValueStrategy(null);
    }
  ]);