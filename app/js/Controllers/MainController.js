app.controller('MainCtrl', ['$scope', '$rootScope', 'notesData', function($scope, $rootScope, notesData) {

	/***
	 * Initialize scope variables
	 */
		notesData.getAllNotes().then( function( data ) {
			$scope.notes = data;
		});

		$scope.modalVisible = false;
		$scope.editableContent = null;
		$scope.newNote = {
			content: ''
		};

	/***
	 * Note operations
	 */

		/**
		 * Add
		 */
		$scope.addNote = function() {
			if(!!$scope.newNote.content) {
				notesData.addNote( $scope.newNote.content).then( function() {
					$scope.newNote.content = "";
				});
			}
		};

		/**
		 * Update
		 */
		$scope.updateNote = function() {
			notesData.updateNote( $scope.noteToEdit).then( function() {
				$rootScope.$broadcast( 'noteUpdated', { noteId: $scope.noteToEdit.id } );
				$scope.editableContent = null;
				$scope.modalVisible = false;
			});
		};

		/**
		 * Delete
		 */
		$scope.deleteNote = function( noteId ) {
			notesData.deleteNote( noteId );
		};

		/**
		 * Remove all notes
		 */
		$scope.clearAll = function() {
			notesData.clearAllNotes().then( function() {
				$scope.notes.length = 0;
			});
		};


	/***
	 *	Editor operations
	 */
		$scope.openEditor = function( note ) {
			$scope.editableContent = note.content;
			$scope.noteToEdit = note;
			$scope.modalVisible = true;
			$rootScope.$broadcast('openEditor');

		};

		$scope.closeEditor = function() {
			$scope.noteToEdit.content = $scope.editableContent;
			$scope.modalVisible = false;
		};
	
}]);


