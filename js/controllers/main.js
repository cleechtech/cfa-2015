
app.controller('MainCtrl', function($scope, Tracts){

	// Define columns
	var columnDefs = [
        {headerName: "Name", field: "name"},
        {headerName: "Population", field: "population"},
        {headerName: "Housing Density", field: "housingDensity"}
    ];

	$scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: null
    };

    // load data
	Tracts.then(function(tracts){
		console.log(tracts);

	    $scope.gridOptions.rowData = tracts;

	    // update grid
	    $scope.gridOptions.api.onNewRows();
	});


});