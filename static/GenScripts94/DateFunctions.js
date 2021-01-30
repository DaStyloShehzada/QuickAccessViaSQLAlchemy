// checks if date passed is valid
function isaDate (day,month,year) {
// checks if date passed is valid
// will accept dates in following format:
// isDate(dd,mm,ccyy), or
// isDate(dd,mm) - which defaults to the current year, or
// isDate(dd) - which defaults to the current month and year.
// Note, if passed the month must be between 1 and 12, and the
// year in ccyy format.
	
    var today = new Date();
    year = ((!year) ? y2k(today.getYear()):year);
    month = ((!month) ? today.getMonth():month-1);
    if (!day) return false
    var test = new Date(year,month,day);
    if ( (y2k(test.getYear()) == year) &&
         (month == test.getMonth()) &&
         (day == test.getDate()) )
        return true;
    else
        return false;
}
	//checks whether a date is a valid date ! send a  date string with dd/mm/yyyy format!
function isValidDate(sdate){
		 var sDate 	   = sdate.split("/");
		 var monthDays = "31,28,31, 30, 31, 30, 31, 31, 30, 31, 30,31"
		 monthDays	   = monthDays.split(",");
    	 var year	   = sDate[2]
      	 var month	   = sDate[1]
      	 var days      = sDate[0]
		 
		 //check whether the date is a valid date
		 if(!isaDate(days,month,year))
		 return false;
		 
       //check valid month
	  	
	    if (isNaN(month) || isNaN(days) || isNaN(year))
		  return false // there is a non-numeric character in one of the component values
			   
		 if( month<1 || month>12 )
		  return false // invalid month
			  
			  
	   
       //february
       if(sDate[0]==2){
			
			if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
							monthDays[1] = 29;
			
			if(1*sDate[0]>1*monthDays[1]){
				return false
			}else return true
		}
		var monthIndex = sDate[1]-1
		if(1*sDate[0]>1*monthDays[monthIndex])	
		return false
		else 
		return true						
	
	}
	
	//THE FUNCTION ADDS  DAYS HOURS  TO A DATE and returns the result date
	function addDays(myDate,days,hours) {
			 var ResultDate=new Date(myDate.getTime() + days*24*60*60*1000 + hours*60*60*1000);
			 
 			 //adjust time zone daylight saving difference
			 var offset= ResultDate.getTimezoneOffset()/60-myDate.getTimezoneOffset()/60;
			 ResultDate.setHours(ResultDate.getHours()*1+offset*1);
		 
    	 return ResultDate;
			 
	}
	
	function getStrDate(myDate){
	 return(myDate.getDate()+"/"+(myDate.getMonth()+1)+"/"+myDate.getYear())
	}


	
	
	//the function return num of days hours minutes according to the retflg sent
	function timeDifference(laterdate,earlierdate,retflg) {
    var difference = laterdate.getTime() - earlierdate.getTime();

    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24
    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60
    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60
    var secondsDifference = Math.floor(difference/1000);
	
		if(retflg=='D')
			return(daysDifference);
		else if(retflg=='H')
			return(hoursDifference);
		else if(retflg=='M')
			return(minutesDifference);
		else if(retflg=='S')
			return(secondsDifference);
		else
			return(daysDifference);
			

}
///////////////////////////////////////////////////////
//this function returns the Javascript Date Object by recieving a string date of dd/mm/yyyy , string time HH:MM:SS format
function prepareDateobj(sDate,sTime){
	var days=0;
	var month=0;
	var year=0;
	var hrs=0;
	var mins=0;	
	var secs=0;
	var DateObj=new Date();
 	var sDate = sDate.split("/");
		 days      = sDate[0]
		 month	   = sDate[1]
		 year	     =   sDate[2]
     if(sTime!=''){ 	 
	 	  sTime = sTime.split(":");
		  hrs	   = sTime[0]
      mins	 = sTime[1]
      secs   = (sTime.length>=3)? sTime[2]:0 
		 }
		DateObj=new Date(year,month-1,days);
		 
   DateObj.setUTCHours(hrs);
	 DateObj.setUTCMinutes(mins); 
	 DateObj.setUTCSeconds(secs);
 
   return DateObj;	       

}
///////////////////////////////////////////////////////
//format the  string in to a dd/mm/yyyy
function formatDate(dateField,sep){

var dateString=dateField.value
var len=dateString.length;
var day='';
var month='';
var year='';
var dstrarr=dateString.split(sep);


if(dateString=='')
return dateString;

var pos=dateString.lastIndexOf(sep);

    //if seperator exists in the date string
    if(pos!=-1){
    dstrarr=dateString.split(sep);
    day=dstrarr[0];
    if(dstrarr.length>1)
    month=dstrarr[1];
    
    if(dstrarr.length>2){
    year=dstrarr[2];
    
    				if(year.length==2)
    				year=getCorrectedYear(year);
    }
    dateString=day
    dateString+=(month!='')? ("/"+month):month;
    dateString+=(year!='')? ("/"+year):year;
    
    }
		//if no seperator exists in the date string
		if(pos==-1){
		if (len == 4){
          day	 			="0"+dateString.substring(0,1);
          month			=dateString.substring(1,2);
          year			=dateString.substring(2,4);
					}								
    else if (len == 5){
          day	 			=dateString.substring(0,2);
          month			="0"+dateString.substring(2,3);
          year			=dateString.substring(3,5);
					
						}								
    else if (len == 6){
          day	 			=dateString.substring(0,2);
          month			=dateString.substring(2,4);
          year			=dateString.substring(4,6);
					
					}									
    else if (len == 7){
         day	 			=dateString.substring(0,2);
          month			="0"+dateString.substring(2,3);
          year			=dateString.substring(3,7);
					
				}										
		else if (len == 8){
         day	 			=dateString.substring(0,2);
         month			=dateString.substring(2,4);
         year				=dateString.substring(4,8);
					
			}	
							
				
				year=getCorrectedYear(year);
																												
				dateString=day+sep+month+sep+year;

				
   }//end of if (no seperator)



	
	dateField.value=dateString;
	return(dateString);			
				
}// end of function


//send 2 digit year  to get  default fullyear
function getCorrectedYear(year) {
    year = year - 0;
    if (year < 70) return (2000 + year);
    if (year < 1900) return (1900 + year);
    return year;
}


	
function y2k(number)
 { 
 return (number < 1000) ? number + 1900 : number;
  }

function daysElapsed(date1,date2) {
    var difference = Date.UTC(y2k(date1.getYear()),date1.getMonth(),date1.getDate(),0,0,0) - Date.UTC(y2k(date2.getYear()),date2.getMonth(),date2.getDate(),0,0,0);
    return difference/1000/60/60/24;
}

function compareDatetime(sdate1,stime1,sdate2,stime2){

var days=0;

date1obj=prepareDateobj(sdate1,stime1);
date2obj=prepareDateobj(sdate2,stime2);

days=timeDifference(date1obj,date2obj,'D');
return (days<0);
}


//this function accepts string date time vals and updates days,hours objects returns
function getTimeDiff(sdate1,stime1,sdate2,stime2,daysobj,hoursobj){

		var date1=prepareDateobj(sdate1,stime1);
		var date2=prepareDateobj(sdate2,stime2);
				
				
		daysobj.value=timeDifference(date1,date2,'D');
		hoursobj.value=timeDifference(date1,date2,'H');
			
}
function getDaysDiff(sdate1,sdate2)
{
		var date1=prepareDateobj(sdate1,'');
		var date2=prepareDateobj(sdate2,'');
		var diff=timeDifference(date1,date2,'D');
		return diff;
}
	
