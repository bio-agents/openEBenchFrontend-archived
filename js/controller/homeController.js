/**
@name homeController.js
@description home page controller
@version 1.0
@date 09/06/2017
@author Vicky Madan Sundesha
*/

//Angular code
(function() {
    'use strict';



		/**
		@name controller function
		@description controls the home-page.html page of the angular app.
		@version 1.0
		@author Vicky Sundesha
		*/
		function homeController ($scope,$rootScope,dataService,$location,$window){
            var vm = this


            vm.search = function (search){
                $window.open($location.absUrl()+"search/"+search, "_self");
            }
		 }

         homeController.$inject = ['$scope','$rootScope','dataService','$location','$window']

        angular.module('elixibilitasApp')
        .controller("homeController",homeController)

})();
