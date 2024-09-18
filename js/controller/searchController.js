/**
@name searchController.js
@description home page controller
@version 1.0
@date 09/06/2017
@author Vicky Madan Sundesha
*/

//Angular code
(function() {
    'use strict';



		/**
		@name searchController function
		@description controls the home-page.html page of the angular app.
		@version 1.0
		@author Vicky Sundesha
		*/
		function searchController ($scope,$rootScope,dataService,$location,$window,$routeParams){
            var vm = this

            vm.loadInitData = function (){
                vm.loadingDisplay = 0;
                vm.data = [];
                vm.currentPage = 1;
                vm.pageSize = 10;
                var search  = $routeParams.search ? $routeParams.search : " ";
                var url = urlObject.urlMonitorRest + "/aggregate?text="+search+"&projection=description&projection=homepage&projection=name";
                dataService.getData(url)
                .then(function (response){
                vm.data = response.data;
                if(vm.data = response.data){
                    vm.loadingDisplay = 1;
                }
                }).catch(function (error){
                    vm.error = error
                    vm.loadingDisplay = 1;
                })

            }

            /**
            @name showDetails
            @description showDetails is called when details button is clicked for everyagent this iterates the semantics and send each semantic to this corisponding function.
            @param agent for details.
            @version 1.0
            @author Vicky Sundesha
            */
            vm.showDetails = function (agent){
                $window.open(location.href.split("#!")[0]+"#!/agent/"+agent.id, "_blank");
            };

		 }




         searchController.$inject = ['$scope','$rootScope','dataService','$location','$window','$routeParams']

        angular.module('elixibilitasApp')
        .controller("searchController",searchController)

})();
