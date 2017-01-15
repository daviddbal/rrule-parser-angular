var rruleApp = angular.module('rruleApp', ['ngRoute']);

rruleApp.controller('RRuleController', function($scope)
{
	// NOW
	var date = new Date();
	date.setSeconds(0,0);

	// FREQUENCY
	freq = {
			DAILY:'Daily',
			WEEKLY:'Weekly',
			MONTHLY:'Monthly',
			YEARLY:'Yearly',
			SECONDLY:'Secondly',
			MINUTELY:'Minutely',
			HOURLY:'Hourly'	};
	$scope.frequencies = [
			{ name:freq.DAILY, type:'Day based', unit:'Day' },
			{ name:freq.WEEKLY, type:'Day based', unit:'Week' },
			{ name:freq.MONTHLY, type:'Day based', unit:'Month' },
			{ name:freq.YEARLY, type:'Day based', unit:'Year' },
			{ name:freq.SECONDLY, type:'Day fraction based', unit:'Second' },
			{ name:freq.MINUTELY, type:'Day fraction based', unit:'Minute' },
			{ name:freq.HOURLY, type:'Day fraction based', unit:'Hour' }
	];
	$scope.frequencySelected = $scope.frequencies[0]; // default to Daily
	
	// INTERVAL
	$scope.interval = 1;

	// WEEKLY OPTIONS
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
	$scope.isWeeklyOptionsShown = function()
	{
		return $scope.frequencySelected.name === freq.WEEKLY;
	}

	// MONTHLY OPTIONS
	monthlyOptions = { DAY_OF_MONTH:'Day of Month', DAY_OF_WEEK:'Day of week' };
	$scope.monthlyOptions = [ monthlyOptions.DAY_OF_MONTH, monthlyOptions.DAY_OF_WEEK ];
	$scope.monthlyOptionSelected = monthlyOptions.DAY_OF_MONTH;
	$scope.isMonthlyOptionsShown = function()
	{
		return $scope.frequencySelected.name === freq.MONTHLY;
	}
	
	// END OPTIONS
	endOptions = { NEVER:'Never', COUNT:'After', UNTIL:'On' };
	$scope.endOptions = [ endOptions.NEVER, endOptions.COUNT, endOptions.UNTIL ];
	$scope.endOptionSelected = endOptions.NEVER;

	// COUNT
	$scope.count = 1;
	$scope.countLabel = "";
	$scope.handleCountChange = function()
	{
		if ($scope.count > 1)
		{
			$scope.countLabel = $scope.frequencySelected.unit + "s";
		} else
		{
			$scope.countLabel = $scope.frequencySelected.unit;
		}
	}
	$scope.handleCountChange();
	$scope.isCountShown = function()
	{
		return $scope.endOptionSelected === endOptions.COUNT;
	}
	
	// UNTIL
	$scope.until = new Date(date);
	$scope.until.setMonth(date.getMonth()+1);
	$scope.isUntilShown = function()
	{
		return $scope.endOptionSelected === endOptions.UNTIL;
	}
	
	// START DATE
	$scope.date = date;
	$scope.time = date;

	// Make RRULE Content
	// TODO - PUT THIS IN A CHILD CONTROLLER?
    $scope.makeRRule = function()
    {
    	// FREQ
    	var rrule = "RRULE:FREQ=" + $scope.frequencySelected.name.toUpperCase();
    	
    	// INTERVAL
    	if ($scope.interval > 1)
		{
    		rrule += ";INTERVAL=" + $scope.interval;
		}
    	
    	// WEEKLY OPTIONS
    	if ($scope.frequencySelected.name  === freq.WEEKLY)
		{
    		days = "";
    		var daysArray = $scope.daysOfWeekSelection.forEach( function(day)
    		{
    			days += "," + day.substring(0,2).toUpperCase();
    		});
    		rrule += ";BYDAY=" + days.substring(1);
		}
    	
    	// MONTHLY OPTIONS
    	if ($scope.frequencySelected.name  === freq.MONTHLY)
		{
    		if ($scope.monthlyOptionSelected === monthlyOptions.DAY_OF_MONTH)
			{
    			rrule += ";BYMONTHDAY=" + $scope.date.getDate();
			} else if ($scope.monthlyOptionSelected === monthlyOptions.DAY_OF_WEEK)
			{
	    		var ordinal = weekOrdinalInMonth($scope.date);
	    		var day = $scope.daysOfWeek[$scope.date.getDay()];
				rrule += ";BYDAY=" + ordinal + day.substring(0,2).toUpperCase();
			}
		}
    	
        /*
         * END criteria
         */
    	if ($scope.endOptionSelected === endOptions.COUNT)
		{
    		if ($scope.count > 1)
			{
        		rrule += ";COUNT=" + $scope.count;
			}
		} else if ($scope.endOptionSelected === endOptions.UNTIL)
		{
			var untilDateString = $scope.until.toISOString();
			untilDateString = untilDateString.replace(/-/g, ""); // remove dashes
			untilDateString = untilDateString.replace(/:/g, ""); // remove colons
			untilDateString = untilDateString.substring(0, untilDateString.indexOf(".")) + "Z"; // remove fraction of second
			rrule += ";UNTIL=" + untilDateString;
		}
    	return rrule;
    }
    
    // Make DTSTART content
    $scope.makeDTStart = function()
    {
    	var dateString = buildDateString($scope.date, "");
//    	return makeDateTime(dateString, "");
//    	var dateString = $scope.date.toISOString();
    	console.log(dateString);
//    	return dateString;
//    	return $scope.date.format("isoDateTime");
//    	var day = $scope.date.getDate();
//    	var month = date.getMonth();
//    	var year = date.getFullYear();
//    	var dateString = $scope.date.toISOString();
//    	dateString = dateString.replace("-","");
//    	dateString = dateString.replace("-","");

		var timeString = buildTimeString($scope.time, "");
		
//        var timeString = $scope.time.toString();

        if (dateString === "")
    	{
        	document.getElementById("submitButton").disabled = true;
    	} else
    	{
        	document.getElementById("submitButton").disabled = false;
    	    var dtstartContentString = "DTSTART"
    	    if (timeString === "")
    		{
    			dtstartContentString += ";VALUE=DATE" + ":" + dateString;
    		} else
    		{
//    			timeString = timeString.replace(":", ""); // remove minutes :
//    			if (timeString.indexOf(":") > 0)
//    			{
//    				timeString = timeString.replace(":", ""); // remove seconds :
//    			} else
//    			{
//    				timeString += "00"; // add 2 zeros is seconds isn't present
//    			}
    			dtstartContentString += ":" + dateString + "T" + timeString;
    		}
    	}
        return dtstartContentString;
//    	document.getElementById('dtstartContent').value = dtstartContentString;
    }
});


// TODO - GET THIS TO WORK
rruleApp.factory('rruleParser', function($http){
    return {
      parse: function(rrule, dtstart, limit){
    	  return "1,2,3";
//        $http.get('countries.json').success(callback);
      }
    };
  });

function makeDateTime(dateString, timeString)
{
	if (timeString === "")
	{
		var d = new Date();
		var options = { hour12: false };
		timeString = d.toLocaleTimeString('default', options);
	}
	return dateString + "T" + timeString;
}

/*
 * Build a date string
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

function buildTimeString(date, delimeter)
{
	var options = { hour12: false, hour: 'numeric' };
	var hourString =  date.toLocaleDateString('default', options);
    hourString = ("0" + hourString).slice(-2); // make 2-digits
	var minuteString =  date.toLocaleDateString('default', {minute: 'numeric'});
    minuteString = ("0" + minuteString).slice(-2); // make 2-digits
	console.log("minuteString:" + minuteString);
	var secondString =  date.getSeconds();
	console.log("secondString:" + secondString);
    secondString = ("0" + secondString).slice(-2).substring(0,2); // make 2-digits
	console.log("secondString:" + secondString);
    return hourString + delimeter + minuteString + delimeter + secondString;
}

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