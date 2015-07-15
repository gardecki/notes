myApp.filter('image', [ function() {
	
	return function( input ) {
		var images = input.match(/https?:\/\/\S*\.(?:png|jpg)/g);
		var response = "";
		
		for( var i = 0 ; i < images.length ; i++ ){
			response += '<img src="' + images[i] + '" width="50%" >';
		}
		
		return response;
	};
}]);
