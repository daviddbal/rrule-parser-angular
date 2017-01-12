var rruleApp = angular.module('rruleApp', ['ngRoute'])
	.controller('MainController', function($scope, rruleParser)
			{
		$scope.recurrences = [1,2,3];
		$scope.rruleContent = "RRULE:FREQ=DAILY";
		// 	TODO - HANDLE BINDING FOR RRULE WITH CONTROLS
		// TODO - HANDLE GETTING PARSED RRULE
//		$scope.parseRRule = function() {
//			$scope.customers.push({ name: $scope.newCustomer.name, city: $scope.newCustomer.city });
//		}
	});

//rruleApp.config(function($routeProvider)
//{
//	$routeProvider
//		.when('/', {
//			templateUrl: 'partials/main.html',
//			controller: 'MainController'
//		})
//		.when('/:params', {
//			templateUrl: 'partials/plain.html',
//			controller: 'PlainController'
//		})
//		.otherwise({
//			redirectTo: '/'
//		});
//});

rruleApp.factory('rruleParser', function($http){
    return {
      parse: function(rrule, dtstart, limit){
    	  return "1,2,3";
//        $http.get('countries.json').success(callback);
      }
    };
  });

//var controllers = {};

//// Controller for main page with controls for setting RRule
//controllers.MainController = function($scope, rruleParser)
//{
//	$scope.recurrences = [1,2,3];
//	// 	TODO - HANDLE BINDING FOR RRULE WITH CONTROLS
//	// TODO - HANDLE GETTING PARSED RRULE
////	$scope.parseRRule = function() {
////		$scope.customers.push({ name: $scope.newCustomer.name, city: $scope.newCustomer.city });
////	}
//}

////Controller for plain page with just comma-delimited list of recurrences
//controllers.PlainController = function($scope, $routeParams, rruleParser)
//{
////	$scope.recurrences = [1,2,3];
//	$scope.recurrences = $routeParams.params;
//
//	//	$scope.recurrences = rruleParser.parse($routeParams.rrule, $routeParams.dtstart, $routeParams.limit);
//	// TODO - HANDLE DISPLAYING RECURRENCES ON DOM
//}

//rruleApp.controller(controllers);