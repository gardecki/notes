/***
 *	Helper directive used to trigger focus event on editor after it's opened
 */

app.directive('focusable', ['$window', function ($window) {

        return {
            restrict: "A",
            link: function ( scope, element, attr ) {
							
               scope.$on('openEditor', function() {
				   element[0].focus();	
				   //TODO: move caret position to the end of text. Requires full jQuery library for complete cross-browser solution.
               });
            }
        };
    }
]);