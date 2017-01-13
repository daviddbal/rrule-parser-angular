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
	// NOW
	var date = new Date();
	
	// FREQUENCY
	frequencyOptions = {
			DAILY : 1,
			WEEKLY : 2,
			MONTHLY : 3,
			YEARLY : 4,
			SECONDLY : 5,
			MINUTELY : 6,
			HOURLY : 7
	};
	$scope.frequency = "DAILY";
	
	// INTERVAL
	$scope.interval = 1;

	// WEEKLY OPTIONS
	weeklyDisplayStyle = {'display' : 'none'};
	$scope.daysOfWeek = [ false, false, false, false, false, false, false ];
	daysOfWeekDisplay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	var day = date.getDay();
	$scope.daysOfWeek[day] = true;

	// MONTHLY OPTIONS
	$scope.monthlyOptions = {
			DAY_OF_MONTH : 1,
			DAY_OF_WEEK : 2
			};
	$scope.monthlyOption = $scope.monthlyOptions.DAY_OF_MONTH;
	$scope.monthlyDisplayStyle = {'display' : 'none'};
	
	// START DATE
	$scope.date = date;
	$scope.time = date;

	// Make RRULE Content
    $scope.makeRRule = function()
    {
    	console.log("monthly:" + $scope.monthlyOption + " " + monthlyOptions.DAY_OF_MONTH);
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
///    		$scope.monthlyDisplayStyle = {'display' : 'inline'};
//	    	var dateString = document.getElementById('dateStart').value;
//	    	var timeString = document.getElementById('timeStart').value;
//	    	var date = makeDateTime(dateString, timeString)
    		if ($scope.monthlyOption === $scope.monthlyOptions.DAY_OF_MONTH)
			{
    			rrule += ";BYMONTHDAY=" + $scope.date.getDate();
			} else if ($scope.monthlyOption === $scope.monthlyOptions.DAY_OF_WEEK)
			{
				
			}
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

/*
 * Build a date string
 * MAY BE OBSOLETE - NEED TO TEST TIME ZONE WITH ANGULAR BINDING
 */
function buildDateString(date, delimiter)
{
    var yearString = date.toLocaleDateString('default', {year: 'numeric'});
    var monthString = date.toLocaleDateString('default', {month: 'numeric'});
    monthString = ("0" + monthString).slice(-2); // make 2-digits
    var dayString = date.toLocaleDateString('default', {day: 'numeric'});
    dayString = ("0" + dayString).slice(-2); // make 2-digits
    return yearString + delimiter + monthString + delimiter + dayString;
}