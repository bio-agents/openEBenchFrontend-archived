/**
@name profileController.js
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
		@description controls the profile-page.html page of the angular app.
		@version 1.0
		@author Vicky Sundesha
		*/
		function profileController ($scope,$rootScope,dataService,$location,$window,$timeout,Upload){
            var vm = this

            vm.name = $location.search().name
            vm.loadDisplay = 1;
            vm.section = 1;
            // vm.section = 0;

            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });
            $scope.$watch('file', function () {
                if ($scope.file != null) {
                    $scope.files = [$scope.file];
                }
            });
            $scope.log = '';

            $scope.upload = function (files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                      var file = files[i];
                      if (!file.$error) {
                        Upload.upload({
                            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                            data: {
                              username: $scope.username,
                              file: file
                            }
                        }).then(function (resp) {
                            $timeout(function() {
                                $scope.log = 'file: ' +
                                resp.config.data.file.name +
                                ', Response: ' + JSON.stringify(resp.data) +
                                '\n' + $scope.log;
                            });
                        }, null, function (evt) {
                            var progressPercentage = parseInt(100.0 *
                                    evt.loaded / evt.total);
                            $scope.log = 'progress: ' + progressPercentage +
                                '% ' + evt.config.data.file.name + '\n' +
                                $scope.log;
                        });
                      }
                    }
                }
            };


            vm.isActive = function () {
                return active;
            }

		 }

         profileController.$inject = ['$scope','$rootScope','dataService','$location','$window','$timeout','Upload']

        angular.module('elixibilitasApp')
        .controller("profileController",profileController)

})();
