var rruleApp = angular.module('rruleApp', ['ngRoute']);

//rruleApp.controller('MainController', function($scope)
//{
//	
//	// 	TODO - HANDLE BINDING FOR RRULE WITH CONTROLS
//	// TODO - HANDLE GETTING PARSED RRULE
////	$scope.parseRRule = function() {
////		$scope.customers.push({ name: $scope.newCustomer.name, city: $scope.newCustomer.city });
////	}
//});

rruleApp.controller('RRuleController', function($scope)
{
	$scope.frequency = "DAILY";
	$scope.interval = 1;

	$scope.weeklyDisplayStyle = {'display' : 'none'};
	$scope.daysOfWeek = [ false, false, false, false, false, false, false ];
//	$scope.daysOfWeek = ['SU','MO','TU','WE','TH','FR','SA'];
	$scope.daysOfWeekDisplay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	var day = new Date().getDay();
	$scope.daysOfWeek[day] = true;

	$scope.monthlyOptions = [ "DAY_OF_MONTH", "DAY_OF_WEEK" ];
	$scope.monthlyOption = $scope.monthlyOptions[0];
	$scope.monthlyDisplayStyle = {'display' : 'none'};

	// Make RRULE Content
    $scope.makeRRule = function()
    {
    	var rrule = "RRULE:FREQ=" + $scope.frequency;
    	if ($scope.interval > 1)
		{
    		rrule += ";INTERVAL=" + $scope.interval;
		}
    	
    	if ($scope.frequency === "WEEKLY")
		{
    		$scope.weeklyDisplayStyle = {'display' : 'inline'};
    		var days = "";
    		for (i=0; i<$scope.daysOfWeek.length; i++)
			{
    			if ($scope.daysOfWeek[i])
				{
    				days += "," + $scope.daysOfWeekDisplay[i].substring(0,2).toUpperCase();
				}
			}
    		rrule += ";BYDAY=" + days.substring(1);
		} else
		{
    		$scope.weeklyDisplayStyle = {'display' : 'none'};
		}
    	
    	if ($scope.frequency === "MONTHLY")
		{
    		$scope.monthlyDisplayStyle = {'display' : 'inline'};
//    	        document.getElementById('monthlyOptions').style.display = "inline";
//    	    	
//    	    	var isDayOfMonthChecked = document.getElementById('dayOfMonthCheckBox').checked;
//    	    	var isDayOfWeekChecked = document.getElementById('dayOfWeekCheckBox').checked;
//    	    	var dateString = document.getElementById('dateStart').value;
//    	    	var timeString = document.getElementById('timeStart').value;
//    	    	var date = makeDateTime(dateString, timeString)
//    	    	var days = ['SU','MO','TU','WE','TH','FR','SA'];
//    	    	var dayOfWeek = days[date.getDay()];
//
//    	   	 	if (!isDayOfMonthChecked && !isDayOfWeekChecked)
//    			{
//    	        	document.getElementById('dayOfMonthCheckBox').checked = true;
//    	        	dom = true;
//    			}
//    	    	if (isDayOfWeekChecked)
//    			{
//    	    		var ordinal = weekOrdinalInMonth(date);
//    				rrule += ";BYDAY=" + ordinal + dayOfWeek;
//    			} else if (isDayOfMonthChecked)
//    			{
//    				rrule += ";BYMONTHDAY=" + date.getDate();
//    			}
//    		} else
//    		{
//    	    	document.getElementById('monthlyOptions').style.display = "none";
//    		}
//    		rrule += ";INTERVAL=" + $scope.monthlyOption;
		} else
		{
			$scope.monthlyDisplayStyle = {'display' : 'none'};
		}
    	return rrule;
    }
	// 	TODO - HANDLE BINDING FOR RRULE WITH CONTROLS
	// TODO - HANDLE GETTING PARSED RRULE
//	$scope.parseRRule = function() {
//		$scope.customers.push({ name: $scope.newCustomer.name, city: $scope.newCustomer.city });
//	}
});

//MyCtrl.resolve = {
//		  myHttpResponse : function($http) {
//		    return $http({
//		        method: 'GET',
//		        url: 'http://example.com'
//		    })
//		    .success(function(data, status) {
//		        // Probably no need to do anything here.
//		    })
//		    .error(function(data, status){
//		        // Maybe add an error message to a service here.
//		        // In this case your $http promise was rejected automatically and the view won't render.
//		    });

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