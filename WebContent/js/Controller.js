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
	date.setSeconds(0,0);
	
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
	
	// END OPTIONS
	$scope.endOptions = {
			NEVER : 1,
			COUNT : 2,
			UNTIL : 3
			};
	$scope.endOption = $scope.endOptions.NEVER;
	$scope.count = 1;
	$scope.countLabel = "events";
	
	$scope.countDisplayStyle = {'display' : 'none'};
	$scope.untilDisplayStyle = {'display' : 'none'};
	
	// START DATE
	$scope.date = date;
	$scope.time = date;

	// Make RRULE Content
	// TODO - PUT THIS IN A CHILD CONTROLLER?
    $scope.makeRRule = function()
    {
    	// FREQ
    	var rrule = "RRULE:FREQ=" + $scope.frequency;
    	
    	// INTERVAL
    	if ($scope.interval > 1)
		{
    		rrule += ";INTERVAL=" + $scope.interval;
		}
    	
    	// WEEKLY OPTIONS
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
    	
    	// MONTHLY OPTIONS
    	if ($scope.frequency === "MONTHLY")
		{
    		$scope.monthlyDisplayStyle = {'display' : 'inline'};
    		if ($scope.monthlyOption === $scope.monthlyOptions.DAY_OF_MONTH)
			{
    			rrule += ";BYMONTHDAY=" + $scope.date.getDate();
			} else if ($scope.monthlyOption === $scope.monthlyOptions.DAY_OF_WEEK)
			{
	    		var ordinal = weekOrdinalInMonth($scope.date);
	    		var day = daysOfWeekDisplay[$scope.date.getDay()];
				rrule += ";BYDAY=" + ordinal + day.substring(0,2).toUpperCase();
			}
		} else
		{
			$scope.monthlyDisplayStyle = {'display' : 'none'};
		}
    	
        /*
         * END criteria
         */
    	if ($scope.endOption === $scope.endOptions.COUNT)
		{
    		$scope.countDisplayStyle = {'display' : 'inline'};
    		rrule += ";COUNT=" + $scope.count;
		} else
		{
    		$scope.countDisplayStyle = {'display' : 'none'};		
		}
    	
    	if ($scope.endOption === $scope.endOptions.UNTIL)
		{
    		$scope.untilDisplayStyle = {'display' : 'inline'};
		} else
		{
    		$scope.untilDisplayStyle = {'display' : 'none'};
		}

//    	var isAfterChecked = document.getElementById('afterCheckBox').checked;
//    	var isOnChecked = document.getElementById('onCheckBox').checked;
//    	if (isAfterChecked)
//    	{
//    		document.getElementById('countSpan').style.display = "inline";
//    		document.getElementById('untilSpan').style.display = "none";
//    		// Set COUNT
//    		var count = document.getElementById('count').value;
//    		var afterType = (count > 1) ? "events" : "event";
//    		document.getElementById('countType').innerHTML = afterType;
//    		rrule += ";COUNT=" + count;
//    	} else if (isOnChecked)
//    	{
//    		document.getElementById('untilSpan').style.display = "inline";	
//    		document.getElementById('countSpan').style.display = "none";
//    		var untilDateString = document.getElementById('until').value;
//    		var timeString = document.getElementById('timeStart').value;
//    		var timeZone = new Date().toString().substring(24);
//    		var offset = new Date().getTimezoneOffset();
//    		var untilDate = new Date(untilDateString + "T" + timeString);
//    		untilDate.setTime(untilDate.getTime() + untilDate.getTimezoneOffset()*60*1000); // time zone offset adjustment
//    		var timestamp = Date.parse(untilDate);
//    		if (! isNaN(timestamp))
//    		{
//    			var untilDateString = untilDate.toISOString();
//    			untilDateString = untilDateString.replace(/-/g, ""); // remove dashes
//    			untilDateString = untilDateString.replace(/:/g, ""); // remove colons
//    			untilDateString = untilDateString.substring(0, untilDateString.indexOf(".")) + "Z"; // remove fraction of second
//    			rrule += ";UNTIL=" + untilDateString;
//    		}
//    	} else
//    	{ // Never end checkbox
//    		document.getElementById('countSpan').style.display = "none";
//    		document.getElementById('untilSpan').style.display = "none";
//    	}

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


function weekOrdinalInMonth(date)
{
    var firstDayInMonth = new Date(date)
    firstDayInMonth.setDate(1);
    var testDate = firstDayInMonth;
    var ordinalWeekNumber = 0;
    while (testDate < date)
    {
        ordinalWeekNumber++;
        testDate.setDate(testDate.getDate()+7); // add one week
    }
    return ordinalWeekNumber;
}