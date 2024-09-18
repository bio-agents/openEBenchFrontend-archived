(function() {
    'use strict';

    angular
        .module('elixibilitasApp')
        .directive('errorMessage', errorMessage);

        function errorMessage (){
            var scope = {
                error : '='
            }
            var directive = {
                restrict : 'EA',
                scope : scope,
                templateUrl : 'view/template/directive/error-template.html'
            }
            return directive;

        }

})();
