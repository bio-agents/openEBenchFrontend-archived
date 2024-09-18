//Angular code
(function (){
	'use strict';

	/**
	@name benchController
	@description controls the bench-page.html page of the angular app.
	@version 1.0
	@author Victor Fernández Rodríguez
	*/




	function benchController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q , $routeParams, dataService){

		var vm = this;

		vm.loadInitData = function (){
			vm.currentPage = 1;
			vm.pageSize = 5;
			var url = urlObject.urlBenchmark+"/Community.json";
			dataService.getData(url)
			.then(function (response){
				vm.communities = response.data;
				// console.log(vm.communities);
				vm.loadingDisplay = 1;
			}).catch(function(error){
				vm.error = error;
				vm.loadingDisplay = 2;
			})
		}

		// vm.makeChart = function()
		// {
		// 	vm.chart = new Chart();
		// 	vm.chart.setType("line");
		// 	vm.chart.setLabel(vm.mockJSON[0].Xval);
		// 	vm.chart.setData([vm.mockJSON[0].Yval]);
		// }



		// vm.retrieveCommunities = function()
		// {
		// 	var url = urlObject.urlBenchmark+"/Community.json";
		// 	vm.communities = [];
		// 	dataService.getData(url).then(function (response){
        //
		// 		response.data.Commmunity.forEach(function(element)
		// 		{
		// 			vm.communities.push(element);
		// 			element.show = false;
		// 			element._extended = false;
        //
		// 			element.links.forEach(function(link)
		// 			{
		// 				if (link.label == "MainSite")
		// 				{
		// 					element["MainSite"] = link["uri"];
		// 				}
		// 			})
		// 		})
		// 	});
		// }();
	};

	benchController.$inject =
	[
		'$scope',
		'$http',
		'$window',
		'$rootScope',
		'$anchorScroll',
		'$location',
		'$q',
		"$routeParams",
		'dataService'
	]

	// Controller creation inside the module elixibilitasApp
	angular
	.module('elixibilitasApp')
	.controller("benchController", benchController);


})();
