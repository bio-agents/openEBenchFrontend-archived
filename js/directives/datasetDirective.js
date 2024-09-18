(function() {
    'use strict';

    angular
        .module('elixibilitasApp')
        .directive('datasetDirective', datasetDirective);

        function datasetDirective (){
            var scope = {
                element: '=',
                index: '=',
                length: '='
            }
            var directive = {
                restrict : 'EA',
                scope : scope,
                templateUrl: 'view/template/directive/dataset-template.html'
            }
            return directive;

        }

})();
