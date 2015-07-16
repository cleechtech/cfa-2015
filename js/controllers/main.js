
app.controller('MainCtrl', function($scope, Tracts){

	Tracts.then(function(tracts){
		console.log(tracts);
		$scope.tracts = tracts;
	})
});