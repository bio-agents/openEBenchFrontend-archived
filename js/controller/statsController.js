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
	function statsController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q ,dataService, errorService,$interval){

		var vm = this;

		vm.loadingDisplay = 0;
		vm.typeArray = [];
		vm.statistics = [];

		var url = urlObject.urlMonitorRest+"/statistics/";

		dataService.getData(url)
			.then(function (response){
				vm.orderStats(response.data);
			}).catch(function(error){
				// vm.createMsg(error);
				vm.error = error;
				vm.loadingDisplay = 2;
			});

		vm.orderStats = function (statistics){

			for (var stats in statistics) {
				var tt = new Agenttype();
				tt.construct(stats,statistics[stats].total,statistics[stats].operational,statistics[stats].total-statistics[stats].operational);
				// console.log(tt);
				vm.statistics.push(tt);
			}
			vm.do();
		}

		vm.do = function () {
		   	//Chart 1
			vm.chart1= new Chart();
			var object = vm.statistics;
			var ope = [];
			var notOpe = [];
			var labels = [];
			var data = [];
			var total = [];
			var o = 0;
			var no = 0;
			var options = {
				title: {
					display: false
				},
				agenttips : {
					titleFontSize : 26,
					bodyFontSize : 20,
					bodySpacing : 4,
				},
				legend: {display: true, position: 'bottom'},
				scales: {
					xAxes: [{
						stacked: true,
					}],
					yAxes: [{
						stacked: true,
					}],

				},
			};
			object.sort(function (a,b){
				return b.total-a.total;
			})
			for (var b of object){
				if (b.type!="all") {
					if(b.total>100){
						labels.push(b.type.toUpperCase()+": "+b.total);
						ope.push(b.operational);
						notOpe.push(b.notOperational);
					} else {
						o = o+b.operational;
						no = no+b.notOperational;
					}
				}
				// total.push(b.total);
			}
			ope.push(o);
			notOpe.push(no);
			labels.push("OTHERS");
			data.push(ope,notOpe);
			vm.chart1.construct("bar",labels,data,['Operational', 'Not Operational'],['#45b7cd', '#ff6384',"#ffffff"],options)


  			var getRepos = ["github","bitbucket","sourceforge","apache","emboss"];
			var charts2labels = [];
			var charts2data = [];
			var i = 0;
			for (i = 0; i < getRepos.length; i++) {
				var url2 = "https://openebench.bsc.es/monitor/rest/statistics/count/repositories?text="+getRepos[i];
				dataService.getData(url2)
					.then(function (response){
						charts2labels.push(response.config.url.split("text=")[1]);

						charts2data.push(response.data);
						
					}).catch(function(error){
						console.log(error);
						vm.error = error;
						vm.loadingDisplay = 2;
					});


			}
			if (i == getRepos.length){
				vm.chart2 = new Chart();
				var options2 = {
					title: {
						display: false
					},
					agenttips : {
						titleFontSize : 26,
						bodyFontSize : 20,
						bodySpacing : 4,
					},
					legend: {display: true, position: 'bottom'},
				};

				vm.chart2.construct("pie",charts2labels,charts2data,"","",options2);
				// console.log(vm.sum2);
			}
			vm.loadingDisplay=1;
		}



		$scope.$watch(()=>vm.type, function(newValue, oldValue){
			if (newValue !== oldValue) {
				for (var j of vm.statistics) {
					Object.keys(j).forEach(function(key) {
						  if (j[key] == newValue) {
						    vm.chart1.setData([j.operational,j.notOperational]);
						  }
					});
				}
			}
		});


		vm.options = {legend: {display: true, position: 'bottom'}};







};
		statsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataService', 'errorService', '$interval']

	angular
	.module('elixibilitasApp')
	.controller("statsController", statsController)



})();
