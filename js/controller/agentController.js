/**
@name agentController.js
@description agent page controller
@version 1.0
@author Vicky Madan Sundesha
*/

//Angular code
(function (){
	'use strict';


	/**
	@name agentController
	@description controls the agent-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function agentController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q, dataService, errorService){

		var vm = this;


		/**
		@name loadInitData
		@description loadInitData starts the app variables with default values this is also where the the $rootScope.array is loaded
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.loadInitData = function() {
			vm.currentPage = 1;
			vm.pageSize = 5;
			vm.agentsArray = [];
			vm.displayDetailsView = 0;
			vm.basicDetails;
			vm.edamTerm = "";
			vm.sortKey;
			vm.reverse;
			vm.chunks=[];

			//if $rootScope.array is empty
			if(!$rootScope.array){
				var url = urlObject.urlMonitorRest+"/statistics/";
				dataService.getData(url)
					.then(function (response){
						vm.getChunks(response.data.all.total);
						$rootScope.typeArray = Object.keys(response.data);
						vm.loadingDisplay = 0;
					}).catch(function(error){
						vm.error = error;
						vm.loadingDisplay = 2;
					})


			} else {
				//if $rootScope.array is full
				vm.agentsArray = $rootScope.array;
				vm.loadingDisplay = 1;
			}

		};


		$('input').hover(elevated);


		function elevated(){
			$(this).toggleClass("elevated");
		}

		// get api in chunks
		vm.getChunks = function (totalAgents){
			var skip = 0;
			var limit = totalAgents;
			var size = 100;
			while(skip<size){
			vm.loopChunks(skip,limit);
				skip = skip + limit;
			}
		}



		//loop chunks
		vm.loopChunks = function(skip,limit){
			// var url = urlObject.urlMonitorRest+"/aggregate?projection=name&projection=homepage&projection=description&projection=homepage&skip="+skip+'&limit='+limit;
			var url = urlObject.urlMonitorRest+"/aggregate?projection=description&projection=homepage&projection=name&skip="+skip+'&limit='+limit;
			console.log(url);
			dataService.getData(url)
				.then(function (response){
					vm.pushData(response);
				}).catch(function(error){
					vm.error = error;
					vm.loadingDisplay = 2;
				})
		}


		//the data recived from api in places
		vm.pushData = function (agents){
		 	vm.chunks.push(agents.data)
			vm.agentsArray = [].concat.apply([], vm.chunks);
			$rootScope.array = [].concat.apply([], vm.chunks);
			vm.loadingDisplay = 1

			// vm.chunks.push(vm.allData(agents.data))
			// vm.agentsArray = [].concat.apply([], vm.chunks);
			// $rootScope.array = [].concat.apply([], vm.chunks);
			// vm.loadingDisplay = 1
		}

		//Sort name
		vm.sort = function (keyName){
			vm.sortKey = keyName;
			vm.reverse = !vm.reverse;
		}



		/**
		@name showDetails
		@description showDetails is called when details button is clicked for everyagent this iterates the semantics and send each semantic to this corisponding function.
		@param agent for details.
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.showDetails = function (agent){

			$window.open($location.absUrl()+agent.id, "_blank");
		};

		// vm.allData= function (agent){
		// 	var array = []
		// 	for (var i = 0; i < agent.length; i++) {
		// 		array.push(vm.initAgent(agent[i]));
		// 	}
		// 	return array
    <!-- {{agent["_id"]._id}} -->
		// }


		// /**
		// @name initInstance
		// @description Creats new instances of a agent and returns the instance
		// @param agent is the response data from the Api
		// @param i is the posistion
		// @version 1.0
		// @author Vicky Sundesha
		// */
		// vm.initInstance = function (agent){
		// 	var instance = new Instance();
		// 	// if(agent['@type']){
		// 	// 	instance.setType(agent['@type'])
		// 	// }
		// 	if(agent.version){
		// 		instance.setVersion(agent.version)
		// 	}
		// 	if(agent.publications){
		// 		instance.setPublication(agent.publications)
		// 	}
		// 	if(agent.repositories){
		// 		instance.setRepo(agent.repositories)
		// 	}
		// 	if(agent.documentation){
		// 		instance.setDocs(agent.documentation)
		// 	}
		// 	return instance;
		// }


		// /**
		// @name checkName
		// @description checks if the agent name exists
		// @param agent is the response data from the Api
		// @param i is the posistion
		// @version 1.0
		// @author Vicky Sundesha
		// */
		// vm.checkName = function (i,agent){
		// 	return agent[i].name != agent[i-1].name ? false : true;
		// }


		/**
		@name initAgent
		@description Creats new agent and returns the agent
		@param agent is the response data from the Api
		@param i is the posistion
		@param instance is are the diffrent instances of the agent web,cmd,app etc..
		@version 1.0
		@author Vicky Sundesha
		*/
		// vm.initAgent = function (agent){
		// 	var agentBasicDetails = new Agent();
		// 	agentBasicDetails.setId(agent['@id']);
		// 	agentBasicDetails.setType(agent['@type']);
		// 	agentBasicDetails.setName(agent.name);
		// 	agentBasicDetails.setDesc(agent.description);
		// 	agentBasicDetails.setLink(agent.homepage);
		// 	agentBasicDetails.setContact(agent.contacts);
		// 	agentBasicDetails.setCredits(agent.credits);
		// 	var urlToBioAgents = "";
		// 	var urlToBioAgents = "https://bio.agents/"+agent.name.replace(/[\s]/g,"_");
		// 	agentBasicDetails.setLinkToBioAgent(urlToBioAgents);
		// 	agentBasicDetails.setInstance(instance);
		// 	return agentBasicDetails;
		// }

		vm.removeFilter = function () {
			vm.edamTerm = "";
			vm.agentsArray = $rootScope.array;
			// vm.loadingDisplay = 1;

		}

		vm.advancedSearch = function (){
			if(vm.edamTerm){
				var url = urlObject.urlEdamSearch+vm.edamTerm;
				dataService.getData(url)
					.then(function (response){
						vm.searchByEdam(response.data);
					}).catch(function(error){
						vm.error = error;
						vm.loadingDisplay = 2;
					})
			} else {
				vm.agentsArray = $rootScope.array;
			}


		}

		vm.searchByEdam = function (data){
			var agentArray = [];
			for (var i = 0; i < data.length; i++) {
				var agent;
				if($rootScope.array.find(agent => agent['_id'] === data[i]['@id'])){
					agentArray.push($rootScope.array[i]);
				}
			}
			if(i == data.length){
				vm.agentsArray = agentArray;
			}

		}

	}


	agentController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q', 'dataService', 'errorService']

	angular
	.module('elixibilitasApp')
	.controller("agentController", agentController);

})();
