(function () {

    'use strict';

    // MODULE
    var angularApp = angular.module('skepsi', []);

    // CONTROLLERS
    angularApp.controller('mainController', ['$scope',
        function ($scope) {
            $scope.name = "Pedro";
        }]);
}());
