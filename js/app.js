
var app = angular.module('census-tracts', [
	"angularGrid"
]);

// Factory
app.factory('Tracts', function($q){
	var dfd = $q.defer();

	d3.tsv('tracts.tsv', function(data){

		var tracts = [];

		// calculate the housing densities for each place 
		_.forEach(data, function(place){

			// add housing density (population per unit)
			var housingDensity = place['Population']/place['Housing Units'];

			var tract = {
				name:place['Name'],
				population: parseInt(place['Population']),
				housingDensity: housingDensity
			};

			tracts.push(tract);
		});

		dfd.resolve(tracts);
	});

	return dfd.promise;
});

// Controller
app.controller('MainCtrl', function($scope, Tracts){

    // Define columns
	var columnDefs = [
        { headerName: "Name", field: "name", unSortIcon: true },
        { headerName: "Population", field: "population", sort: 'desc', unSortIcon: true },
        { headerName: "Housing Density", field: "housingDensity", unSortIcon: true }
    ];

	$scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: null,
        dontUseScrolls: true,
        enableSorting: true
    };

    // load data
	Tracts.then(function(tracts){
	    $scope.gridOptions.rowData = tracts;

	    // update grid
	    $scope.gridOptions.api.onNewRows();
	});

});