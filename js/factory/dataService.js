(function() {
    'use strict';

    angular
        .module('elixibilitasApp')
        .factory('dataService', dataService);

    dataService.$inject = ['$http','$q'];


        function dataService($http,$q) {

            var service = {
                getData: getData,
                error:error
            }

            return service;

            function getData(url) {
                var def = $q.defer();
                $http({

                    method: 'GET',
                    url: url,
                }).then(function successCallback(response){
                         def.resolve(response);
                }).catch(function errorCallback(error){
                        def.reject(error);
                });
                return def.promise;
            };


            function error(code) {
                console.log("<div class='container alert alert-danger text-center' role='alert'> Error with code : "+code+"</div>");
            };
        }



})();
