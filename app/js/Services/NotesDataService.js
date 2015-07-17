app.factory('notesData', ['$injector', 'config', function( $injector, config ) {


	/***
	 * 	Returns data storage provider set in config.dataStorageProvider ( app.js )
	 *
	 * 	Required variables:
	 * 		notes[] 					- Array of note objects
	 *
	 * 	Required functions:
	 * 	  	addNote( noteContent ) 		- Creates new node with specified content. Returns $q promise.
	 *		updateNote( noteObject )	- Updates existing node. Returns $q promise.
	 *		deleteNote( noteObject )	- Deletes existing node. Returns $q promise.
	 *		getAllNotes()				- Get array of all notes and pass it to notes[]. Returns $q promise.
	 *		clearAllNotes()				- Removes all notes. Returns $q promise.
	 *
	 *	exampleNoteObject: {
	 *		id: 1,
	 *		content: 'Hello!',
	 *		created: '2015-07-17T15:29:01.634Z'
	 *  }
	 *
	 */

	return $injector.get( config.dataStorageProvider );
	
}]);
