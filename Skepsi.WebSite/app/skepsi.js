(function () {

    'use strict';

    // MODULE
    var angularApp = angular.module('skepsi', []);

    // CONTROLLERS
    angularApp.controller('mainController', ['$scope', '$http',
        function ($scope, $http) {
            $scope.name = "Pedro";

            $http.get('http://skepsiteste.azurewebsites.net/api/Pensamentos/Dia')
                .success(function (result) {

                    $scope.pensamento = result;
                })
                .error(function (data, status) {
                    console.log(data);
                });

            $scope.novoPensamento = '';
            $scope.addPensamento = function () {
                $http.post('http://skepsiteste.azurewebsites.net/api/pensamentos/incluir', pensamento: '"' + $scope.novoPensamento + '"')
                .success(function (result) {

                    console.log(result);
                    $scope.novoPensamento = '';

                })
                .error(function (data, status) {

                    console.log(data);

                });
            };
        }
    ]);
}());
