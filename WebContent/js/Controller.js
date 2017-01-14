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
	$scope.fruits = { Mango: true, Banana: false};

	// FREQUENCY
	  $scope.frequencies = [
			{ name:'Daily', type:'Day based', unit:'Day' },
			{ name:'Weekly', type:'Day based', unit:'Week' },
			{ name:'Monthly', type:'Day based', unit:'Month' },
			{ name:'Yearly', type:'Day based', unit:'Year' },
			{ name:'Secondly', type:'Day fraction based', unit:'Second' },
			{ name:'Hourly', type:'Day fraction based', unit:'Minute' },
			{ name:'Minutely', type:'Day fraction based', unit:'Hour' }
	];
	$scope.frequency = $scope.frequencies[0];
	$scope.handleFrequencyChange = function()
	{
    	if ($scope.frequency.name === "Weekly")
		{
    		$scope.weeklyOptionsShow = true;
    		$scope.monthlyOptionsShow = false;
		} else if ($scope.frequency.name  === "Monthly")
		{
    		$scope.weeklyOptionsShow = false;
    		$scope.monthlyOptionsShow = true;
		} else
		{
    		$scope.weeklyOptionsShow = false;
    		$scope.monthlyOptionsShow = false;
		}
		$scope.handleCountChange();
	}
	
	// INTERVAL
	$scope.interval = 1;

	// WEEKLY OPTIONS
	$scope.weeklyOptionsShow = false;
	$scope.daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	$scope.daysOfWeekSelection = [];

	// Add today to selected day of week
	var day = date.getDay();
	$scope.daysOfWeekSelection.push($scope.daysOfWeek[day]);
	
	$scope.toggleDayOfWeekSelection = function toggleDayOfWeekSelection(dayOfWeek)
	{
		var index = $scope.daysOfWeekSelection.indexOf(dayOfWeek);
		if (index > -1)
		{
			$scope.daysOfWeekSelection.splice(index,1);
		} else
		{
			$scope.daysOfWeekSelection.push(dayOfWeek);
		}
	}

	// MONTHLY OPTIONS
	$scope.monthlyOptionsShow = false;
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
	$scope.countDisplayStyle = {'display' : 'none'};
	$scope.untilDisplayStyle = {'display' : 'none'};

	$scope.handleEndOptionChange = function()
	{
		if ($scope.endOption === $scope.endOptions.NEVER)
		{
			$scope.countDisplayStyle = {'display' : 'none'};
			$scope.untilDisplayStyle = {'display' : 'none'};
		} else if ($scope.endOption === $scope.endOptions.COUNT)
		{
			$scope.countDisplayStyle = {'display' : 'inline'};			
			$scope.untilDisplayStyle = {'display' : 'none'};
		} else if ($scope.endOption === $scope.endOptions.UNTIL)
		{
			$scope.untilDisplayStyle = {'display' : 'inline'};			
			$scope.countDisplayStyle = {'display' : 'none'};
		}
	};
	
	// COUNT
	$scope.count = 1;
	$scope.countLabel = "";
	$scope.handleCountChange = function()
	{
		if ($scope.count > 1)
		{
			$scope.countLabel = $scope.frequency.unit + "s";
		} else
		{
			$scope.countLabel = $scope.frequency.unit;
		}
	}
	$scope.handleCountChange();	
	
	// START DATE
	$scope.date = date;
	$scope.time = date;

	// Make RRULE Content
	// TODO - PUT THIS IN A CHILD CONTROLLER?
    $scope.makeRRule = function()
    {
    	// FREQ
    	var rrule = "RRULE:FREQ=" + $scope.frequency.name.toUpperCase();
    	
    	// INTERVAL
    	if ($scope.interval > 1)
		{
    		rrule += ";INTERVAL=" + $scope.interval;
		}
    	
    	// WEEKLY OPTIONS
    	if ($scope.frequency.name  === "Weekly")
		{
    		days = "";
    		var daysArray = $scope.daysOfWeekSelection.forEach( function(day)
    		{
    			days += "," + day.substring(0,2).toUpperCase();
    		});
    		rrule += ";BYDAY=" + days.substring(1);
		}
    	
    	// MONTHLY OPTIONS
    	if ($scope.frequency.name  === "Monthly")
		{
    		if ($scope.monthlyOption === $scope.monthlyOptions.DAY_OF_MONTH)
			{
    			rrule += ";BYMONTHDAY=" + $scope.date.getDate();
			} else if ($scope.monthlyOption === $scope.monthlyOptions.DAY_OF_WEEK)
			{
	    		var ordinal = weekOrdinalInMonth($scope.date);
	    		var day = $scope.daysOfWeek[$scope.date.getDay()];
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
    		if ($scope.count > 1)
			{
        		rrule += ";COUNT=" + $scope.count;
			}
		} else if ($scope.endOption === $scope.endOptions.UNTIL)
		{
    		// TODO
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