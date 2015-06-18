/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
.run(['$rootScope','$urlRouter',function ($rootScope,$urlRouter) {
	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 
			console.log('in promise...............');
			console.log(toState);
		    //event.preventDefault(); 
		    // transitionTo() promise will be rejected with 
		    // a 'transition prevented' error
		    
		    // Continue with the update and state transition if logic allows
		    //$urlRouter.sync()
		});
	$rootScope.$on('$stateNotFound', 
		function(event, unfoundState, fromState, fromParams){ 
		    console.log(unfoundState.to); 
		    console.log(unfoundState.toParams); 
		    console.log(unfoundState.options); 
		});
	$rootScope.$on('$stateChangeError', 
		function(event, toState, toParams, fromState, fromParams, error){
			//do something ...
		});
}]);
