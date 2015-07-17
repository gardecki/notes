/***
 *	Directive responsible for displaying single note.
 */

app.directive('note', [ function() {

	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/note.html',
		scope: {
			note: '='
		},
		link: function( scope, elem ){

			showImages();

			/**
			 *	Replaces image paths with HTML <img> element
			 */
			function showImages() {
				var template = scope.note.content;

				var patt=/\bhttps?:\/\/\S*?\.(?:png|jpg)\b/ig;

				while ( match = patt.exec( template ) ) {
					var replacement = '<img src="' + match + '" width="30%" >';
					template = template.substr( 0, match.index ) + replacement +
							   template.substr( patt.lastIndex, template.length - patt.lastIndex );
				}
				elem.children()[0].innerHTML = template;
			}

			/**
			 *	Refreshes note images after update
			 */
			scope.$on( 'noteUpdated', function( event, data ) {
				if( scope.note.id == data.noteId ) {
					showImages();
				}
			});
		}
	}

}]);