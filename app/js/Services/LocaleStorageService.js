/***
 *	Service provides basic "REST like" methods using HTML5 localeStorage
 */

app.factory( 'localeStorage', ['$q', function( $q ) {

/**********
 *  Private
 */
    var notes = [];

    /**
     * Calculates unique ID for newly created note.
     * @returns {number}
     */
        function calculateUniqueID() {
            var maxID = 0;
            for( var i = 0 ; i < notes.length ; i++ ) {
                if( maxID < notes[i].id ) {
                    maxID = notes[i].id;
                }
            }
            return maxID + 1;
        }

    /**
     * Returns array index of note with specified id.
     * @param noteId
     * @returns {null if there's no such note or notes[] index }
     */
        function getNoteIndexById( noteId ) {
            for( var i = 0 ; i < notes.length ; i++ ) {
                if( noteId == notes[i].id ) {
                    return i;
                }
            }
            return null;
        }

    /**
     * Set all notes from notes array to localeStorage
     */
        function setAllNotes() {
            localStorage.setItem('notes', JSON.stringify(notes));
        }



/*********
 *  Public
 */

    /**
     * Creates new note
     * @param content : string
     * @returns {promise}
     */
        function addNote( content ) {
            var deferred = $q.defer();
            var newNote = {
                id: calculateUniqueID(),
                created: new Date(),
                content: content
            };
            notes.push( newNote );
            deferred.resolve();
            setAllNotes();
            return deferred.promise;
        }

    /**
     * Updates existing note
     * @param note : object
     * @returns {promise}
     */
        function updateNote( note ) {
            var deferred = $q.defer();
            localStorage.setItem('notes', JSON.stringify(notes));
            deferred.resolve();
            return deferred.promise;
        }

    /**
     * Deletes note with specified id
     * @param noteId: number
     * @returns {promise}
     */
        function deleteNote( noteId ) {
            var deferred = $q.defer();
            var index = getNoteIndexById( noteId );
            if( index !== null ) {
                notes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(notes));
            }
            deferred.resolve();
            return deferred.promise;
        }

    /**
     * Gets all notes
     * @returns {promise}
     */
        function getAllNotes() {
            var deferred = $q.defer();
            notes = JSON.parse(localStorage.getItem("notes")) || [];
            deferred.resolve( notes );
            return deferred.promise;
        }

    /**
     * Removes all notes
     * @returns {promise}
     */
        function clearAllNotes() {
            var deferred = $q.defer();
            notes.length = 0;
            localStorage.setItem('notes', JSON.stringify(notes));
            deferred.resolve();
            return deferred.promise;
        }


    return {
        addNote: addNote,
        updateNote: updateNote,
        deleteNote: deleteNote,
        getAllNotes: getAllNotes,
        clearAllNotes: clearAllNotes
    }

}]);
