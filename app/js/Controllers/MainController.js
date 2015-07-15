myApp.controller('MainCtrl', ['$scope', function($scope) {
	
$scope.kwa = "lala jfskdjfnhkjsdf jfskdjfnhkjsdf jfskdjfnhkjsdf   jfskdjfnhkjsdf  jfskdjfnhkjsdf jfskdjfnhkjsdf jfskdjfnhkjsdf jfskdjfnhkjsdf  jfskdjfnhkjsdfjfskdjfnhkjsdfjfskdjfnhkjsdfjfskdjfnhkjsdf jfskdjfnhkjsdf lalala kwakwakwa http://www.quicksprout.com/images/foggygoldengatebridge.jpg ciekawe jak to bedzie wygl?da?o bo wszystko wskazuje na to , ?e b?dzie to co? obrzydliwego.jfskdjfnhkjsdf http://images6.fanpop.com/image/photos/32300000/Melissa-melissa-benoist-32325941-960-637.jpg hoho http://www.quicksprout.com/images/foggygoldengatebridge.jpg hoho";
	$scope.html = "<p>uaua</p>";
}]);


myApp.directive('showImages', [ '$compile', function( $compile ) {

	return {
		restrict: 'E',
		replace: true,
		scope: {
			content: '='
		},
		controller: function ( $scope ) {

		},
		link: function( scope, elem, attrs ){

			scope.$watch('content', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					console.log("I see a data change!");
				}
			});


			var template = '<div class="note">' + scope.content + '</div>';

			var images = scope.content.match(/https?:\/\/\S*\.(?:png|jpg)/g);

			/*for(var i = 0 ; i < images.length ; i++ ) {
				var replacement = '<img src="' + images[i] + '" width="100px" >';
				template = template.replace(images[i], replacement);
			}*/

			var patt=/https?:\/\/\S*\.(?:png|jpg)/g;

			while ( match = patt.exec(template) ) {

				console.log( template.substr( match.index, patt.lastIndex - match.index ) );

				template = template.substr( 0, match.index ) + '<img src="' + match + '" height="200px" >' + template.substr( patt.lastIndex, template.length - patt.lastIndex );

				console.log(match.index + ' ' + patt.lastIndex);
			}



			template = $compile(template)(scope);
			elem.replaceWith(template);
		}
	}

}]);