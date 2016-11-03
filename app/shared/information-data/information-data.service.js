'use strict';

// angular.module('information.data')
//     .factory("InformationDataService", ['$http', '$q', function ($http, $q) {
//         var url = "https://jsonplaceholder.typicode.com/users";
//
//         var _getAllData = function () {
//             var request = $http.get(url);
//
//             return (request.then(function (response) {
//                 return( response.data);
//             },
//                 function (error) {
//                     if (
//                         ! angular.isObject( error.data ) ||
//                         ! error.data.message
//                     ) {
//                         return( $q.reject( "An error occurred." ) );
//                         }
//                     // Otherwise, use expected error message.
//                     return( $q.reject( error.data.message ) );
//                     }
//                 ))
//         };
//
//         return {
//             getAllData: _getAllData
//         }
//     }]);

// using ngResource
angular.module('information.data')
    .factory('InformationDataService', ['$resource', function ($resource) {
        var url = "https://jsonplaceholder.typicode.com/users/:id";
        return $resource(url, {id: '@id'}, {update: {method: 'PUT'}} );
    }]);