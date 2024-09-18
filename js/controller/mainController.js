/**
@name mainController.js
@description main page controller
@version 1.0
@date 09/06/2017
@author Vicky Madan Sundesha
*/


// $(document).ready(function() {
//     // Check if body height is higher than window height :)
//     console.log("hola");
//
//     if ($("ng-view").height() > $(window).height()) {
//         alert("Vertical Scrollbar! D:");
//     }
//
//     // Check if body width is higher than window width :)
//     if ($("ng-view").width() > $(window).width()) {
//         alert("Horizontal Scrollbar! D:<");
//     }
// });


//Angular code
(function() {
    'use strict';

	/**
	@name mainController
	@description controls the index.html page of the angular app and sets the $rootScope.array
    where the agents are saved once every session this is used in the agentController.
	@version 1.0
	@author Vicky Madan Sundesha
	*/
	function mainController ($scope, $rootScope, dataService,$location,$document){
        var vm = this;
        $rootScope.array;
        $rootScope.allData=[];
        $rootScope.typeArray=[];
        $rootScope.emailRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        vm.isActive = function (viewLocation) {
             var active = (viewLocation === $location.path());
             return active;
        }


        // console.log($document.height(),$document.innerHeight());

    };

    mainController.$inject = ['$scope','$rootScope','dataService','$location','$document']

    angular
    .module('elixibilitasApp')
    .controller("mainController",mainController)

})();
