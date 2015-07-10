/**
 * Created by Levana.Xue on 6/9/2015.
 * languages : cn / en 
 */
'use strict';

angular.module('portalDemoApp')
  .config(['server','$translateProvider',
    function(server,$translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'languages/locale-',
        suffix: '.json'
      });
      $translateProvider.preferredLanguage(server.preferredLanguages);
      $translateProvider.useSanitizeValueStrategy(null);
    }
  ]);