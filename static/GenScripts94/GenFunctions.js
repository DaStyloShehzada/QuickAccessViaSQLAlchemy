//if we want to disable right click :
//function click(evt)
//{
//if (event.button==2)
//	{
//	alert("|^This function is not permitted in RentPro^|");
//	return false;
//	}
//}
//document.onmousedown=click;
	//===================================//
	// main validation  called by form event handlers



// Global variale 
var url;
url=location.protocol+"//";
url=url+location.hostname+':'+location.port;
url=url+location.pathname;
url=url+"?appname=RentProWeb&PrgName=";

//Dubai Police Interface
var dpurl;
dpurl=location.protocol+"//";
dpurl=dpurl+location.hostname+':'+location.port;
dpurl=dpurl+location.pathname;
dpurl=dpurl+"?appname=DubaiPoliceInterface&PrgName=";



// Global variale   END

var urlhost=location.protocol+"//";
urlhost=urlhost+location.hostname+':'+location.port;



var urlPath;
urlPath=location.protocol+"//";
urlPath=urlPath+location.hostname+':'+location.port;
urlPath=urlPath+location.pathname;

document.oncontextmenu = 
    function () {
//      return false;
    };

	
var	mem_outdate,mem_indate, mem_outtime,  mem_intime;

   	function isDate(field) {
	gField = field
	var thisYear = getTheYear()
			if(!isDateFormat((thisYear - 200),(thisYear + 100)))
			{
			if (window.event) //IE
				window.event.returnValue = false;
			else //Firefox
				 return false;
			gField.focus();
			gField.select();
			return false
			}
	return true
	}
	
	//===================================//

	function getTheYear() {
	var thisYear = (new Date()).getFullYear()
	thisYear = (thisYear < 100)? thisYear + 1900: thisYear
	return thisYear
	}

	//===================================//
	
	// date field validation (called by other validation func that specify minYear/maxYear)
	function isDateFormat(minYear,maxYear,minDays,maxDays) {
	var inputStr = gField.value
	//amir change to ignore the 00/00/0000 as a date
	if ((inputStr=="00/00/0000") || (inputStr=="00/00/00")){
	  gField.value = "00/00/0000"
	return true
	}

	// convert hyphen delimiters to slashes
	   		   while (inputStr.indexOf("-") != -1) {
			   inputStr = replaceString(inputStr,"-","/")
			   }
	
	var delim1 = inputStr.indexOf("/")
	var delim2 = inputStr.lastIndexOf("/")
			   if (delim1 != -1 && delim1 == delim2) {
			   // there is only one delimiter in the string
			   alert("|^The date entry is not in an acceptable format.^| |^You can enter dates in the following formats:^| |^mmddyyyy, mm/dd/yyyy or mm-dd-yyyy.^| |^(If the month or date data is not available, enter \01\ in the appropriate location)^|")
			   return false;
			   }
			
			   if (delim1 != -1) {
			   // there are delimiters; extract component values
			   var dd = parseInt(inputStr.substring(0,delim1),10)
			   var mm = parseInt(inputStr.substring(delim1 + 1,delim2),10)
			   var yyyy = parseInt(inputStr.substring(delim2 + 1, inputStr.length),10)
			   }
			   else {
			   // there are no delimiters; extract component values
			   var dd = parseInt(inputStr.substring(0,2),10)
			   var mm = parseInt(inputStr.substring(2,4),10)
			   var yyyy = parseInt(inputStr.substring(4,inputStr.length),10)
			   }
			
			   if (isNaN(mm) || isNaN(dd) || isNaN(yyyy)) {
			   // there is a non-numeric character in one of the component values
			   alert("|^The date entry is not in an acceptable format.^| |^You can enter dates in the following formats:^| |^ddmmyyyy, dd/mm/yyyy, or dd-mm-yyyy.^|")
			   return false
			   }
		
			   if (dd < 1 || dd > 31) {
			   // date value is not 1 thru 31
			   alert("|^Days must be entered between the range of 01 and a maximum of 31 (depending on the month and year).^|")
			   return false
			   }
			
			   if (mm < 1 || mm > 12) {
			   // month value is not 1 thru 12
			   alert("|^Months must be entered between the range of 01 (January) and 12 (December).^|")
			   return false
			   }

			   // validate year, allowing for checks between year ranges
			   // passed as parameters from other validation functions
			   if (yyyy < 100) {
			   // entered value is two digits, which we allow for 1980-2030
			   	  		
						  if (yyyy >= 30) {
						  yyyy += 1900
						  }
						   else {
						  yyyy += 2000
						  }

						
//			     yyyy += 2000
			   }
			
var today = new Date()
			  if (!minYear) {
			  // func called with specific day range parameters
			  var dateStr = new String(dd + "/" + mm + "/" + yyyy)
			  }
			  else if (minYear && maxYear) {
			  // func called with specific year range parameters
			   	  	if (yyyy < minYear || yyyy > maxYear) {
					// entered year is outside of range passed from calling function
					alert("|^The most likely range for this entry is between the years^|" + minYear + "|^and^| " + maxYear + ".")
					return false
					}
			  }
			  else if (yyyy < minYear || yyyy > maxYear) {
					alert("|^It is unusual for a date entry to be before^| " + minYear +" "+ "|^or after^|" + maxYear + "|^. Please verify this entry.^|")
					return false
					}
			
	          if (!checkMonthLength(dd,mm)) {
				return false
				}
			
			  if (mm == 2) {
			   	    if (!checkLeapMonth(dd,mm,yyyy)) {
			   			return false
			   		}
			  }

	// put the Informix-friendly format back into the field
var zero1="";//amir change
var zero2="";
if (dd<10) zero1="0";
if (mm<10) zero2="0";
	
	
	gField.value = zero1+dd + "/" +zero2+ mm + "/" + yyyy
	
	
	
	
	return true
	}

	//===================================//

	// extract front part of string prior to searchString
	function getFront(mainStr,searchStr){
	foundOffset = mainStr.indexOf(searchStr)
			if (foundOffset == -1) {
			return null
			}
	return mainStr.substring(0,foundOffset)
	}
	
	//===================================//

	// extract back end of string after searchString
	function getEnd(mainStr,searchStr) {
	foundOffset = mainStr.indexOf(searchStr)
		if (foundOffset == -1) {
		return null
		}
	return mainStr.substring(foundOffset+searchStr.length,mainStr.length)
	}

	//===================================//

	// replace searchString with replaceString
	function replaceString(mainStr,searchStr,replaceStr) {
	var front = getFront(mainStr,searchStr)
	var end = getEnd(mainStr,searchStr)
		if (front != null && end != null) {
		return front + replaceStr + end
		}
	return null
	}
	
	//===================================//

	// check the entered month for too high a value
	function checkMonthLength(dd,mm) {
	var months = new Array("","|^January^|","|^February^|","|^March^|","|^April^|","|^May^|","|^June^|","|^July^|","|^August^|","|^September^|","|^October^|","|^November^|","|^December^|")
	
		if ((mm == 4 || mm == 6 || mm == 9 || mm == 11) && dd > 30)
		{
		alert(months[mm] + "|^Has only 30 days.^|")
		return false
		}
		 else if (dd > 31) {
		alert(months[mm] + "|^Has only 31 days.^|")
		return false
		}
	return true
	}
	
	//===================================//

	// check the entered February date for too high a value
	function checkLeapMonth(dd,mm,yyyy) {
		if (yyyy % 4 > 0 && dd > 28) {
		alert("|^February of^| " + yyyy +" "+ "|^Has only 28 days.^|")
		return false
		}
		 else if (dd > 29) {
		alert("|^February of^| " + yyyy + "|^Has only 29 days.^|")
		return false
		}
	return true
	}
//===================================//


//===================================//
// Time validation function
function isTime(timeStr) 
{
		if(!TimeFormat(timeStr)){
		event.returnValue=false;	
			timeStr.focus();
			timeStr.select();
			return false
		}
	return true
}
//===================================//

function TimeFormat(gField){
	var inputStr = gField.value;
	var delim1 = inputStr.indexOf(":")
			   if (delim1 != -1) {
				   var hh = parseInt(inputStr.substring(0,delim1),10)
				   var min = parseInt(inputStr.substring(delim1 + 1, inputStr.length),10)
				   }
			   else {
			   // there are no delimiters; extract component values
				   var hh = parseInt(inputStr.substring(0,2),10)
				   var min = parseInt(inputStr.substring(2,inputStr.length),10)
				   }
			
			 //this is for time that was given without min that min 12=12:00 & 12:=12:00		
			   if (!isNaN(hh) && isNaN(min))
			   {
			       if(inputStr.length<4) min=0;
			   }
			
			
			   if (isNaN(hh) || isNaN(min)) {
				   // there is a non-numeric character in one of the component values
				   alert("|^The time entry is not in an acceptable format.^|\n\n|^You can enter time in the following formats: hhmin, hh:min.^|")
				   return false
				   }
			
			   if (hh < 0  || hh > 23) {
				   alert("|^Hour must be between 1 and 23.^|");
				   return false;
				   }

			  if (min < 0 || min > 59) {
				  alert ("|^Minute must be between 0 and 59.^|");
				  return false;
				  }

// put the Informix-friendly format back into the field
var zero1="";//amir change
var zero2="";
if (hh<10) zero1="0";
if (min<10) zero2="0";
gField.value = zero1+hh + ":"+zero2 +  min
return true;
}

	//===================================//
	
//  End -->


function NotEmptyField(a)   //for must fields: field is not " " , not "0"
{
   if((a=='')||(a=='0')||(a=='00/00/0000')||(a=='00/00/00'))
      return false
   else
      return true;
}

/*
function Numeric(c)     //field doesn't hold numeric data
{
	if(isNaN(c))
	   return false
    else
       return true;
}
*/

function NewWin(addr,winName,subWin,Properties)
{
    eval('winName=window.open(addr,subWin,Properties)');
}

//=========THIS PART FOR CALCULATE TIME=======//
//amir change
function change_to_minuts(formy,outdate,outtime,indate,intime)
{
	var date1=do_date(outdate,outtime);
	var date2=do_date(indate,intime);
	
	//adjust time zone daylight saving difference
			var offset=date2.getTimezoneOffset()/60-date1.getTimezoneOffset()/60;
		  date2.setHours(date2.getHours()-offset);
			 	
	var minuts=(date2-date1)/1000/60;  //mili to->   sec to ->min
	return minuts;
}
	//===================================//
function calc_hours_days(call_obj,outdate,outtime,indate,intime,days,hours)
{
	 //alert(call_obj);
	 var minuts=change_to_minuts(call_obj.form,outdate,outtime,indate,intime);//give date2-date1 in nin
	 hours.value=parseInt((minuts/60)%24);
   if((hours.value*1) - ((minuts/60)%24) < 0) hours.value = (hours.value*1)+1;//a part of an hour considered as whole hour.
   days.value=parseInt(minuts/60/24);
	 if(hours.value == 24) //Added by Rahul for solution of problem 1 day 24 hours
	 {
	 	hours.value =0;
		days.value = parseInt(days.value) + 1;
	 }
}

//===================================//
function do_date(a_Date,a_Time)
{
	var str1=a_Time.value;//hh:mm
	var hour1=str1.substring(0,2);//give the two first digits from the intime example 12:23 ->12
	var minut1=str1.substring(3,5);//give the two last digits from the intime example 12:23 ->23
	
	var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/; // requires 4 digit year
	var matchArray = a_Date.value.match(datePat); // dd/mm/yyyy
	
	var day1 = matchArray[1]; // parse date into variables first one
	var month1 = matchArray[3];
	var year1= matchArray[4];
	
	var date1=new Date(month1+"/"+day1+"/"+year1);
	
	date1.setHours(hour1);
	date1.setMinutes(minut1);
	return date1;
}
	//===================================//
function calc_indate(formy,outdate,outtime,indate,intime,days,hours)//culculate outate+days
{
    var date1=do_date(outdate,outtime);
	var date2=new Date();												
	var myMilySec =date1*1+(days.value*1)*1000*60*60*24 +(hours.value*1)*1000*60*60;
	date2.setTime(myMilySec);
		
		
//make the Time zone offset same for not considering the day light savings
	var offset=date2.getTimezoneOffset()/60-date1.getTimezoneOffset()/60;
  date2.setHours(date2.getHours()+offset);		
		
	var thisYear=date2.getFullYear();
	if (thisYear<100) thisYear=thisYear+1900;
		
	date2.setYear(thisYear);	
	
var zero1="";//to have a zero start in date when days build the date
var zero2="";
if (date2.getDate()<10) zero1="0";
if ((date2.getMonth()*1+1)<10) zero2="0";

	var str=zero1+date2.getDate()+ "/" +zero2+ (date2.getMonth()*1+1) +"/" +(thisYear*1);
document.forms[0].indate.value=str;
if(formy.name=="hours")
	{
		var zeroH="",zeroM="";
		if(date2.getHours()<10) zeroH="0";
		if(date2.getMinutes()<10) zeroM="0";
		var strTime=zeroH+date2.getHours()+":"+zeroM+date2.getMinutes();
		document.forms[0].intime.value=strTime;
	}
								//+1900 delete becouse bug in 1999 to 2000	
}
	//===================================//
function Date_time_change(obj,outdate,outtime,indate,intime,days,hours)//first check the field and then exec the right function
{										//to calculate diffrence between dates
	switch (obj.name)
	{	
		case "outdate":{
					 	  if (mem_outdate!=outdate.value)
						  {
						  		if (isDate(obj)==true)
								{
									mem_outdate=outdate.value;//date is ok this is to remember and do like onChange
									calc_indate(obj,outdate,outtime,indate,intime,days,hours);
									magicRemoteEventProcessing(document.forms[0].outdate,'change');
								}
								else return false;	
    				      }
					    }
			break;
		case "indate":	
		{
						  if (mem_indate!=indate.value)
						   {
								if ( (isDate(obj)==true) &&(checkNegtiveTime(obj,outdate,outtime,indate,intime,days,hours)==true) )
								//if (isDate(obj)==true)
								{
									mem_indate=indate.value	;
									calc_hours_days(obj,outdate,outtime,indate,intime,days,hours);
								}
								else return false;
						   }
						}
			break;			
		case "outtime":	{
						 if (mem_outtime!=outtime.value)
						  {
								   if (isTime(obj)==true)
								   {
									  intime.value=obj.value;
									  mem_intime=intime.value;
									  mem_outtime=outtime.value;//update for good time
									  calc_hours_days(obj,outdate,outtime,indate,intime,days,hours);	
								   }
								   else return false;
						  }
		
						}
			break;
		case "intime":	{
						  if (   mem_intime!=intime.value)
						   {
								if ( (isTime(obj)==true)&&(checkNegtiveTime(obj,outdate,outtime,indate,intime,days,hours)==true) )
								//if (isTime(obj)==true)
								{
 								    mem_intime=intime.value;
									calc_hours_days(obj,outdate,outtime,indate,intime,days,hours);	
								}
								else return false;
						   }
						   return;
						}
			break;
			case "InHours":	
						{
						  	if ( (isTime(intime)==true))//&&(checkNegtiveTime(obj,outdate,outtime,indate,intime,days,hours)==true)
								{
 								    mem_intime=intime.value;
									if  ( (change_to_minuts(obj.form,outdate,outtime,indate,intime))<0) //give date2-date1 in nin
									{
										alert("|^Invalid Date/Time Period !^|");
										event.returnValue=false;
										obj.focus();
										return false;
									}
 									calc_hours_days(intime,outdate,outtime,indate,intime,days,hours);
 									return true;	
								}
								else return false;
						  
						}
			break;
		default: 	
	}
		
}

	//===================================//
function checkNegtiveTime(obj,outdate,outtime,indate,intime,days,hours)
{
	if  ( (change_to_minuts(obj.form,outdate,outtime,indate,intime))<0) //give date2-date1 in nin
		{
			alert("|^Invalid Date/Time Period !^|");
			event.returnValue=false;
			obj.focus();
			obj.select();
			return false;
		}
	return true;
}
	//===================================//
function initDate()
{
   mem_outdate=document.forms[0].outdate.value;//in case this is the first form (not have to document)
   mem_indate=document.forms[0].indate.value;
//because intime became onblur instead of onchange make some truble so
   mem_outtime=document.forms[0].outtime.value;
   mem_intime=document.forms[0].intime.value;
}


//=========//
function myRound(num,X)
{
    X = (!X ? 2 : X);
    return Math.round(num*Math.pow(10,X))/Math.pow(10,X);
}

//===============Functions To Compare Dates=====================//
function doDate1(obj)//get parameter as "indate" object
{//this function make from string like 12/12/2000 a date object
      	//if ( ! isDate(obj) ) return false;
		var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/; // requires 4 digit year
   		var matchArray = obj.value.match(datePat); // dd/mm/yyyy
		var day1 = matchArray[1]; // parse date into variables first one
		var month1 = matchArray[3];
		var year1= matchArray[4];
		
var new_date=new Date(month1+"/"+day1+"/"+year1);
return new_date;
}
function DateInFuture(obj)//the parametr is date field object + the func already check for correct date
{
	if (isDate(obj))
	{
		var d1=doDate1(obj);
	    var today=ServerCurrentDate;//new Date();//today 00:00:sec
		//this part is to zero the today object hours+minuts
		/*today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);*/
		//d1.setMinutes(1);
		
		if (d1>today)
		{
			alert("|^Date Cannot be in the Future^|")
			event.returnValue=false;
			gField.focus();
			gField.select();
   			return true;
		}
	 return false;//not future date
	}//if (isDate)
	
	return false
}//not calc the hh:mm

function DateInPast(obj,SkipMessage)//the parametr is date field object
{
	if (isDate(obj))
	{
		var d1=doDate1(obj);
	    var today=ServerCurrentDate;//new Date();
		//this part is to zero the today object hours+minuts
		/*today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);*/
		d1.setMinutes(1);

		if (d1<today)
		{
			if(!SkipMessage)
				alert("|^Date Can Not be in Past^|")
			event.returnValue=false;
			gField.focus();
			gField.select();
    		return true;
		}
	 return false;//not past date
	}//if (isDate)

	return false
}

function compDates(Date1,Date2)// = 12/12/1999 - 12/11/1999 =true the 2parametrs are dates object
{//check if date1 > date2 then return true else false         //like indate and outdate
	var d1=doDate1(Date1);
	var d2=doDate1(Date2);
	gField =Date1;
	if (d1>d2)
	{
			event.returnValue=false;
			gField.focus();
			gField.select();

		return true; //date1 bigger then date2
	}
	else return false;  //date2 bigger then date1
}



// this function is getting a number of days to add to a date and update the resault
function Add_Days_2Date(Days,a_Date,ReturnDate)  //Days is days to add, a_Date is date to be added, ReturnDate is the object that get the resault
{
	var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/; // requires 4 digit year
	var matchArray = a_Date.value.match(datePat); // dd/mm/yyyy
	var day1 = matchArray[1]; // parse date into variables first one
	var month1 = matchArray[3];
	var year1= matchArray[4];
	var Today = new Date();
	var Hours = Today.getHours();
	var Minutes = Today.getMinutes();
	var WarrantyDate = new Date(month1+"/"+day1+"/"+year1);
	WarrantyDate.setHours(Hours);
	WarrantyDate.setMinutes(Minutes);

	var WarrantyMilisec = WarrantyDate.getTime();
	var NextTime = WarrantyMilisec + (60 * 60 * 24 * (Days.value*1) * 1000);
	var NewDate = new Date(NextTime);

	var DD   =   NewDate.getDate()
		  DD= ((DD < 10) ? "0" : "") + DD;
	var MM   =   NewDate.getMonth()+1
    	  MM= ((MM < 10) ? "0" : "") + MM
	var YYYY =  NewDate.getFullYear()
	ReturnDate.value =  DD+'/'+MM+'/'+YYYY;
}

// validate only Numbers , . for amount field, Type will decide wether fire error here or on page

 function CheckValidAmount(field,Type)
{
	if(!Numeric(field.value))
	{
	alert("|^Invalid entry!  only numbers are accepted !^| ");
			field.focus();
			field.value='';
			field.select();
	}
	
}

//general print alert for choosing the landscape while printing
function PrintAlert(){
alert("|^Please, Choose Landscape from Papersetup in Printer Settings^|");
}
// trim leading and trailing spaces and also leading zeros
function trim(txt) {
    while (txt.substring(0,1) == ' ' || txt.substring(0,1) == '0' ) {
        txt = txt.substring(1, txt.length);
	}
    while (txt.substring(txt.length-1,txt.length) == ' ') {
        txt = txt.substring(0, txt.length-1);
	}	
	
	return txt;
}


//  function for setting a cookie.
function setCookie(name, value, expires, path, domain, secure) {
  document.cookie = name + "=" + escape(value) +
  ((expires == null) ? "" : "; expires=" + expires.toGMTString()) +
  ((path == null) ? "" : "; path=" + path) +
  ((domain == null) ? "" : "; domain=" + domain) +
  ((secure == null) ? "" : "; secure");
}

//  function for getting a cookie.
function getCookie(name){
  var cname = name + "=";
  var dc = document.cookie;
  if (dc.length > 0) {
    begin = dc.indexOf(cname);
    if (begin != -1) {
      begin += cname.length;
      end = dc.indexOf(";", begin);
      if (end == -1) end = dc.length;
        return unescape(dc.substring(begin, end));
    }
  }
  return null;
}

//  function for deleting a cookie.
function delCookie (name,path,domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
    ((path == null) ? "" : "; path=" + path) +
    ((domain == null) ? "" : "; domain=" + domain) +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}


// Funtion to return the type of credit card
function typeOfCard(number) {
	/* 
	//	Card Prefixes
	//
	//	Mastercard	51-55
	//	Visa		4
	//	AmEx		34,37
	//	Discover	6011
	*/

	var firstNumber = number.substring(0,1);
	var firstThreeNumbers = number.substring(0,3);

	if (firstNumber == 4) {
		return "VISA";
	} 

	var firstTwoNumbers = number.substring(0,2);
	if (firstTwoNumbers > 50 && firstTwoNumbers < 56) {
		return "MASTERCARD";
	}

	if (firstTwoNumbers == 34 || firstTwoNumbers == 37) {
		return "AMEX";
	}

	var firstFourNumbers = number.substring(0,4);
	if (firstFourNumbers == 6011) {
		return "DISCOVER";
	}
}

// Function that determines whether a credit card number is valid
// Please note that a valid credit card number is not essentially a
// credit card in good standing.
function isValidCreditCard(number) {

	var total = 0;
	var flag = 0;
	for (var i=(number.length - 1);i>=0; i--) {
		if (flag == 1) {
			var digits = number.charAt(i) * 2;
			if (digits > 9) digits -= 9;
			total += digits;
//			var reminder = digits % 10;
//			var quotient = (digits - reminder) / 10;
//			total = total + parseInt(reminder);
//			total = total + parseInt(quotient);
			flag = 0;
		} else {
			total = total + parseInt(number.charAt(i));
			flag = 1;
		}
	}//end of for loop
	if ((total%10) == 0) {
		return true;
	} else {
		return false;
	}
}//end of function


//pass the field  obj to change it's value to upper Case
function uppercase(fld){

fld.value=fld.value.toUpperCase();

}

//this functon makes the combo get selected with the value passed
function setSelectedCmb(cmbobj,selectedval){

	for(i=0;i<cmbobj.options.length;i++)
	if(cmbobj.options[i].value==selectedval)
	cmbobj.options[i].selected=true;
	
	return true;
}


function TimeInFuture(obj)//the parametr is time field object + the func already check for correct time
{
	if (isTime(obj))
	{
		  var d1=new Date();
	    var currtime=d1.getHours()+":"+d1.getMinutes();

		if (obj.value>currtime)
		{
			alert("|^Time Cannot be in the Future^|")
			obj.focus();
			event.returnValue=false;
		  
   			return true;
		}
	 return false;//not future date
	}//if (isTime)
	
	return false
}





addEvent(window, "load", sortables_init);

var SORT_COLUMN_INDEX;

function sortables_init() {
    // Find all tables with class sortable and make them sortable
    if (!document.getElementsByTagName) return;
    tbls = document.getElementsByTagName("table");
    for (ti=0;ti<tbls.length;ti++) {
        thisTbl = tbls[ti];
        if (((' '+thisTbl.className+' ').indexOf("sortable") != -1) && (thisTbl.id)) 
		{
            //initTable(thisTbl.id);
			ts_makeSortable(thisTbl);
				//Added for Table Alternate Row Hilite
			tableDecorate(thisTbl);
        }
		//if(((' '+thisTbl.className+' ').indexOf("sortable1") != -1) && (thisTbl.id)) 
			//tableDecorate(thisTbl);
    }
}

function ts_makeSortable(table) {
    if (table.rows && table.rows.length > 0) {
        var firstRow = table.rows[0];
    }
    if (!firstRow) return;
    
    // We have a first row: assume it's the header, and make its contents clickable links
    for (var i=0;i<firstRow.cells.length;i++) {
        var cell = firstRow.cells[i];
        var txt = ts_getInnerText(cell);
		if (thisTbl.className!="sortable1")
			cell.innerHTML = '<a href="#" class="sortheader" onclick="ts_resortTable(this);return false;">'+txt+'<span class="sortarrow">&nbsp;&nbsp;&nbsp;</span></a>';
		else
			cell.innerHTML = '<a href="#" class="sortheader" onclick="";return false;">'+txt+'<span class="sortarrow">&nbsp;&nbsp;&nbsp;</span></a>';
    }
}

function ts_getInnerText(el) {
	if (typeof el == "string") return el;
	if (typeof el == "undefined") { return el };
	if (el.innerText) return el.innerText;	//Not needed but it is faster
	var str = "";
	
	var cs = el.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				str += ts_getInnerText(cs[i]);
				break;
			case 3:	//TEXT_NODE
				str += cs[i].nodeValue;
				break;
		}
	}
	return str;
}

function ts_resortTable(lnk) {
    // get the span
    var span;
    for (var ci=0;ci<lnk.childNodes.length;ci++) {
        if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
    }
    var spantext = ts_getInnerText(span);
    var td = lnk.parentNode;
    var column = td.cellIndex;
    	
	//For Sort
	//var table = getParent(td,'TABLE');
	var table = getParentForSort(td,'TABLE');
    // Work out a type for the column
    if (table.rows.length <= 1) return;
    var itm = ts_getInnerText(table.rows[1].cells[column]);
    sortfn = ts_sort_caseinsensitive;
		if(itm.match(/^\s?\d\d[\/-]\d\d[\/-]\d\d\d\d\s\d\d[\/-/:]\d\d[\/-/:]\d\d\s?$/)) sortfn = ts_sort_date_time;
		if(itm.match(/^\s?\d\d[\/-]\d\d[\/-]\d\d\s\d\d[\/-/:]\d\d[\/-/:]\d\d\s?$/)) sortfn = ts_sort_date_time;
    if (itm.match(/^\s?\d\d[\/-]\d\d[\/-]\d\d\d\d\s?$/)) sortfn = ts_sort_date;
    if (itm.match(/^\s?\d\d[\/-]\d\d[\/-]\d\d\s?$/)) sortfn = ts_sort_date;
		
    if (itm.match(/^[�$]/)) sortfn = ts_sort_currency;
    if (itm.match(/^[\d\.]+$/)) sortfn = ts_sort_numeric;
    SORT_COLUMN_INDEX = column;
    var firstRow = new Array();
    var newRows = new Array();
    for (i=0;i<table.rows[0].length;i++) { firstRow[i] = table.rows[0][i]; }
    for (j=1;j<table.rows.length;j++) { newRows[j-1] = table.rows[j]; }

    newRows.sort(sortfn);

    if (span.getAttribute("sortdir") == 'down') {
        ARROW = '&nbsp;&nbsp;&uarr;';
        newRows.reverse();
        span.setAttribute('sortdir','up');
    } else {
        ARROW = '&nbsp;&nbsp;&darr;';
        span.setAttribute('sortdir','down');
    }
    
    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
    // don't do sortbottom rows
    for (i=0;i<newRows.length;i++) { if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) table.tBodies[0].appendChild(newRows[i]);}
    // do sortbottom rows only
    for (i=0;i<newRows.length;i++) { if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1)) table.tBodies[0].appendChild(newRows[i]);}
    
    // Delete any other arrows there may be showing
    var allspans = document.getElementsByTagName("span");
    for (var ci=0;ci<allspans.length;ci++) {
        if (allspans[ci].className == 'sortarrow') {
            if (getParent(allspans[ci],"table") == getParent(lnk,"table")) { // in the same table as us?
                allspans[ci].innerHTML = '&nbsp;&nbsp;&nbsp;';
            }
        }
    }
        
    span.innerHTML = ARROW;
		tableDecorate(table);
}

/*function getParent(el, pTagName) {
	if (el == null) return null;
	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	// Gecko bug, supposed to be uppercase
		return el;
	else
		return getParent(el.parentNode, pTagName);
}*/

//For Sorting Records added by manisha
function getParentForSort(el, pTagName) {
	if (el == null) return null;
	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	// Gecko bug, supposed to be uppercase
		return el;
	else
		return getParentForSort(el.parentNode, pTagName);
}		
		
function ts_sort_date(a,b) {
    // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
		var i=0,j=0;
		var aa,bb;
		aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
		
		for(i=0;i<aa.length;i++)
		{
		 		if(aa.charAt(i)!=" ")
				break;
		}
			for(j=i;j<aa.length;j++)
		{
		 		if(aa.charAt(j)==" ")
				break;
		}
		
		aa=aa.substr(i,j);//for taking date without spaces

		i=0;j=0;
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
			for(i=0;i<bb.length;i++)
		{
		 		if(bb.charAt(i)!=" ")
				break;
		}
			for(j=i;j<bb.length;j++)
		{
		 		if(bb.charAt(j)==" ")
				break;
		}
		bb=bb.substr(i,j);//for taking date without spaces
		
    if (aa.length == 10) {
        dt1 =aa.substr(6,4)+ aa.substr(3,2)+aa.substr(0,2);
				
    } else {
        yr = aa.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt1 = yr+aa.substr(3,2)+aa.substr(0,2);
    }
    if (bb.length == 10) {
        dt2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
    } else {
        yr = bb.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt2 = yr+bb.substr(3,2)+bb.substr(0,2);
    }
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
}
function ts_sort_date_time(a,b) {
    // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
		var i=0,j=0;
		var aa,bb,t1,t2,time1,time2;
		var SpaceLocNo;
		aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
		t1=aa;
		for(i=0;i<aa.length;i++)
		{
		 		if(aa.charAt(i)!=" ")
				break;
		}
			for(j=i;j<aa.length;j++)
		{
		 		if(aa.charAt(j)==" ")
				{SpaceLocNo=j;
				break;
				}
		}
		
		aa=aa.substr(i,j);//for taking date without spaces
		time1=t1.substring(SpaceLocNo+1);
		i=0;j=0;
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
		t2=bb;
			for(i=0;i<bb.length;i++)
		{
		 		if(bb.charAt(i)!=" ")
				break;
		}
			for(j=i;j<bb.length;j++)
		{
		 		if(bb.charAt(j)==" ")
				{SpaceLocNo=j;
				break;}
		}
		bb=bb.substr(i,j);//for taking date without spaces
		time2=t2.substring(SpaceLocNo+1);
    if (aa.length == 10) {
        dt1 =aa.substr(6,4)+ aa.substr(3,2)+aa.substr(0,2);
					
    } else {
        yr = aa.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt1 = yr+aa.substr(3,2)+aa.substr(0,2);
    }
    if (bb.length == 10) {
        dt2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
    } else {
        yr = bb.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt2 = yr+bb.substr(3,2)+bb.substr(0,2);
    }
    if ((dt1==dt2)&&(time1==time2)) return 0;
		if((dt1==dt2)&&(time1<time2)) return -1;
    if (dt1<dt2) return -1;
		
    return 1;
}


function ts_sort_currency(a,b) { 
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    return parseFloat(aa) - parseFloat(bb);
}

function ts_sort_numeric(a,b) { 
    aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX])); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
}

function ts_sort_caseinsensitive(a,b) {
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}

function ts_sort_default(a,b) {
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}


function addEvent(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,  NS6 and Mozilla
// By Scott Andrew
{
  if (elm.addEventListener){
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent){
    var r = elm.attachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
} 


function compareDatesByValue(FROM_DATE,TO_DATE)//Comparing dates By value     * parameters sholud be value not object , like fromdate.value*
//Compare dates like 01/09/2004 & 01/10/90 including Y2K problem
{
 			if(FROM_DATE.length==10)
			{
			 				FROM_DATE =FROM_DATE.substr(6,4)+ FROM_DATE.substr(3,2)+FROM_DATE.substr(0,2);
			}
			else
			{
        yr = FROM_DATE.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        FROM_DATE = yr+FROM_DATE.substr(3,2)+FROM_DATE.substr(0,2);
    }
			if(TO_DATE.length==10)
			{
			 				TO_DATE =TO_DATE.substr(6,4)+ TO_DATE.substr(3,2)+TO_DATE.substr(0,2);
			}
			else
			{
        yr = TO_DATE.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        TO_DATE = yr+TO_DATE.substr(3,2)+TO_DATE.substr(0,2);
    		}
				if(FROM_DATE>TO_DATE)
									return true;
				else
									return false;
							
}

//Added For Alternate RowHilite 
var tableDecorate_rows = true;
var tableDecorate_columns = true;

function tableDecorate(t) {
  if (!tableDecorate_rows && !tableDecorate_columns) return;
  if (!document.getElementsByTagName) return;
  for (var i=1; i<t.rows.length; i++) {
	if(i%2==1)
    t.rows[i].className="qAccessTableEvenRow";
	else
	   t.rows[i].className="qAccessTableOddRow";
				
  }
}
function temp()//used for disabling links
{
}
function CheckInStr(HostString,SearchStr)
{
var i;
i=HostString.indexOf(SearchStr)
if(i===-1)
return false;
else
return true;
}
// For Changing Decimal format
function ReturnStandValue(Amount,DecSep)
{
//Parameters
//DecSep 0 for dot .  & 1 for , decimal
//It will return
// Value as Decimal separator as . & removing all ',' commas 

	var amt;
	amt=Amount;
			
	if(DecSep==1)
	{
		amt=amt.replace('.' ,'');
		amt=amt.replace(/,/, '.')
	  }
	else
	{
		amt= amt.replace(/,/, '');
	}
	return amt;
}

function ReturnLocalValue(Amount,DecSep) //DecSep 0 for dot .  & 1 for , decimal
  // 12/05/06 -Added by SNEHA - Fn returns Value with Decimal separator as ',' COMMA  
{
//Parameters
//DecSep 0 for dot .  & 1 for , decimal
//It will return
//will return Value with Decimal separator as ',' COMMA & removing all '.' DOTS  

	var amt;
	amt=Amount;
			
	if(DecSep==1)
	{
  	amt= amt.replace(/,/, '');
		amt=amt.replace('.' , /,/);
	
	  }
	else
	{
		amt= amt.replace(/,/, '');
	}
	return amt;
}

function Numeric(string) {

string=trim(string);
if(string.length<=0) return true;
if (!string) return false;
var Chars = "0123456789.,";
var i = 0;
if(string.charAt(0)=='-')
i=1;

for (; i < string.length; i++)
{ if (Chars.indexOf(string.charAt(i)) == -1)
return false;
}
return true;
} 

function UpdateDatetime(FromDate,FromTime,Days,hours,ChDateObj,ChTimeObj)
	{
		 var delim1 = FromDate.indexOf("/");
		 var delim2 = FromDate.lastIndexOf("/");
		 var h1=FromTime.indexOf(":");
		  var Fromday=parseInt(FromDate.substring(0,delim1),10)
		  var FromMonth=parseInt(FromDate.substring(delim1+1,delim2),10)
		  var FromYear=parseInt(FromDate.substring(delim2+1,FromDate.length),10)
		  var FromHour=parseInt(FromTime.substring(0,h1),10);
		 var FromMin=parseInt(FromTime.substring(h1+1,FromTime.length),10);
		 var fd=new Date();
		 fd.setFullYear(FromYear,FromMonth-1,Fromday);
		  fd.setHours(FromHour);
		 fd.setMinutes(FromMin);
		 var fdInTime=fd.getTime()
		 var temp=fd.getTime();
		 var days_mil=24*3600*1000;
		 var hours_mil=3600*1000;
		 temp+=(Days*days_mil)+(hours*hours_mil)
		 fd.setTime(temp);
		 var d="",m="",y="",h="",mt="";
		 if(fd.getDate()<10)
		 	d="0";
		 d+=fd.getDate();
		 if((fd.getMonth()+1)<10)
		 	m="0";
		 m+=(fd.getMonth()+1);
		 y=fd.getFullYear();
	//	 alert(d+"/"+m+"/"+y);
		 if(fd.getHours()<10)
		 	h="0";
		 h+=fd.getHours();
		 if(fd.getMinutes()<10)
		 	mt="0"
		 mt+=fd.getMinutes();
		 ChDateObj.value=d+"/"+m+"/"+y;
		 ChTimeObj.value=h+":"+mt;
	}
function getDayName(dt)
{
	myDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	dts = dt.split("/");
	mmddyyyy = dts[1] + '/' + dts[0] + '/' + dts[2];
	myDate=new Date(eval('"'+mmddyyyy+'"'));
	if(!isNaN(myDate.getDay()))
		return(myDays[myDate.getDay()]);
	return("");
}


function disableAll()
{
		if (document.all) 
		{
		var anchorTags = document.images;//Disable Images
        		for (var j = 0; j < anchorTags.length ; j++)
            {
              document.images[j].disabled=true;
            }
      			for (i = 0; i < document.forms[0].length; i++) 
      			{
      			var formElement = document.forms[0].elements[i];
      	  
              				 if(formElement.id!='EnbButton')
                				{
                				
                  				if(formElement.type=='text')
                					formElement.readOnly = true;
                					else if(formElement.type=='button')
                    			formElement.style.display='none';
                       		else if(formElement.type=='hidden'){}
													else if(formElement.type=='checkbox'){}
													else if(formElement.type=='radio'){}
													else if(formElement.type=='select-one'){}
   												else
                      		formElement.disabled = true;
                    			}
        				
      				
     					 }
		}
}

function loadDefXml(PrgString)
{
                   var loadAcc;
 				 					 var urlOc = url+PrgString;
            			 var xmltemp = new ActiveXObject("Msxml2.XMLHTTP.3.0");
                   xmltemp.open("GET",urlOc, false);
                   xmltemp.send();
            			 return (xmltemp.responseXML);
}

function loadDefXmPost(PrgString)
{
                   var loadAcc;
 				 					 var xmltemp = new ActiveXObject("Msxml2.XMLHTTP.3.0");
                   xmltemp.open("POST",urlPath, false);
									 xmltemp.setRequestHeader('Content-type','application/x-www-form-urlencoded;charset=UTF-8;');
									 xmltemp.setRequestHeader("Content-length", 3);
									 xmltemp.setRequestHeader("Connection", "close");
	    						 xmltemp.send('AppName=RentproWeb&PrgName='+PrgString);
            			 return (xmltemp.responseXML);
}

//function to convert round to specific decimal point
function DecimalPoint(num,decimals)
{
 		if(typeof(num)=='string')
		{
			 num=isNaN(parseFloat(num))?0:parseFloat(num);
		}
		if(!decimals)
			decimals=1;														
    return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
}
function DateTimeInFuture(DateObj,TimeObj)//the parametr is Date , time field object + the func checks for correct time
{

	if (isDate(DateObj))
	{
		var dd1=doDate1(DateObj);
	    var today=ServerCurrentDate;
		//this part is to zero the today object hours+minuts
	/*	today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);*/
		dd1.setMinutes(1);

		if (dd1==today || dd1>today)
		{
			
			if (isTime(TimeObj))
			{
					  //var d1=new Date();
						//hr=d1.getHours();
						//mn=d1.getMinutes();
				var tm=getServerTime();
				hr=tm.substr(0,2);
				mn=tm.substr(3,2);
		/*	if(d1.getHours()>=0 && d1.getHours()<=9)
			{
			 hr="0"+d1.getHours();
			}
			if(d1.getMinutes()>=0 && d1.getMinutes()<=9)
			{
			 mn="0"+d1.getMinutes();
			}*/
			var currtime=hr+":"+mn;
			if (TimeObj.value>currtime)
			{
				alert("|^Time Cannot be in the Future^|")
				TimeObj.focus();
				event.returnValue=false;
			  	return true;
			}
		   }//if (isTime)		
		}
		isTime(TimeObj);
	  }	
	 return false;
}
function validateEmailAddress(obj) {
	if(obj.value!='')
	{
		var email=obj.value;
 		var emailReg = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		var ret=emailReg.test(email);
             	if(!ret)
		{
			alert("|^Invalid Email Address, Format Should Be name@domain.com^|");
               		event.returnValue=false;
			obj.focus();
			obj.select();
			return false;
		}
		return ret; 
              
	}
        return true; 
}
function validateEmailDomain(obj) {
	var email=obj.value;
	var emailReg = /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	var ret=emailReg.test(email);
	if(!ret)
	{
		alert("|^Invalid Format For Domain, Format Should be @domain.com^|");
		obj.focus();
		return false;
	}
	return ret; 
}
function CheckFloatKey(e)
{
	if(e.keyCode>=44 && e.keyCode<=57 && e.keyCode!=47)
		return true;
	else
		return false;
}
function CheckFloatKeyDefine(e)
{
	if(e.keyCode>=44 && e.keyCode<=57 && e.keyCode!=47 && e.keyCode!=45)
		return true;
	else
		return false;
}
function CheckIntegerKey(e)
{
	//alert(e.keyCode);
	if((e.keyCode>=48 && e.keyCode<=57) || e.keyCode==45)
		return true;
	else
		return false;
}
function CheckPositiveIntegerKey(e)
{
	if(e.keyCode==8 || e.keyCode==46 || e.keyCode==9)
			return true;
	if(e.keyCode){
		if(e.keyCode>=48 && e.keyCode<=57)
			return true;
		else
			return false;
	}
	// e.which works in mozilla changes by ranjit
	if(e.which){
		if(e.which>=48 && e.which<=57)
			return true;
		else
			return false;
	}
	
}
function CheckAlphaNumeric(e)
{
 		with(document.forms[0])
		{
		 if(e.keyCode>=48 && e.keyCode<=57)//numbers 0-9
		 	return true;
		 if(e.keyCode>=97 && e.keyCode<=122)//alpha a-z
		 	return true; 
		 if(e.keyCode>=65 && e.keyCode<=90)//alpha A-Z
		 	return true; 
		return false;
		}
}
function checkForActive(calledFor,doc)
{
 with(document.forms[0])
 {
    var link1="CheckActiveInActive&ARGUMENTS=-A"+calledFor+",-A"+doc;
    var urlOc = url+link1;	
    var xmlGetCount = new ActiveXObject("Msxml2.XMLHTTP.3.0");
    xmlGetCount.open("GET",urlOc, false);
    xmlGetCount.send();
    var xml = xmlGetCount.responseXML;
		var rt=xml.getElementsByTagName('Active').item(0);
		if(rt)
			 if(rt.text=='Y') 
			   return true;
		return false;
     
 }
}
function getElementsById(sId)
 {
    var outArray = new Array();	
	if(typeof(sId)!='string' || !sId)
	{
		return outArray;
	};
	
	if(document.evaluate)
	{
		var xpathString = "//*[@id='" + sId.toString() + "']"
		var xpathResult = document.evaluate(xpathString, document, null, 0, null);
		while ((outArray[outArray.length] = xpathResult.iterateNext())) { }
		outArray.pop();
	}
	else if(document.all)
	{
		
		for(var i=0,j=document.all[sId].length;i<j;i+=1){
		outArray[i] =  document.all[sId][i];}
		
	}else if(document.getElementsByTagName)
	{
	
		var aEl = document.getElementsByTagName( '*' );	
		for(var i=0,j=aEl.length;i<j;i+=1){
		
			if(aEl[i].id == sId )
			{
				outArray.push(aEl[i]);
			};
		};	
		
	};
	
	return outArray;
 }
 function returnSelectedRadioValue(object)//is directly name of Radio Button
 {
	with(document.forms[0])
	{
		var myOption=-1;
		var returnValue="";
		for (i=object.length-1; i > -1; i--) 
        {
            if(object[i].checked) 
            {
                myOption = i;
				returnValue=object[i].value;
            }
        }
		return returnValue;
	}
 }
 function ReplaceAll(Source,stringToFind,stringToReplace){

  var temp = Source;

    var index = temp.indexOf(stringToFind);

        while(index != -1){

            temp = temp.replace(stringToFind,stringToReplace);

            index = temp.indexOf(stringToFind);

        }

        return temp;

}
 function replaceHTMLCharacters(text)//Use This Function Convert special characters in XML Or Parameter value to HTML codes.			
 {									// Don't use this Function to Conert whole URL	
	text=ReplaceAll(text,"%","%25");
	text=ReplaceAll(text,"&","%26");
	//text=ReplaceAll(text,",","%2C");
	text=text.replace(/,/g,"\\,");
	text=ReplaceAll(text,'"',"%22");
	text=ReplaceAll(text,"'","%27");
	text=ReplaceAll(text,"<","%3C");
	text=ReplaceAll(text,">","%3E");
	text=ReplaceAll(text,"+","%2B");
	text=ReplaceAll(text,"-","%2D");
	text=ReplaceAll(text,".","%2E");
	text=ReplaceAll(text,"/","%2F");
	text=ReplaceAll(text,":","%3A");
	text=ReplaceAll(text,";","%3B");
	text=ReplaceAll(text,"#","%23");
	text=ReplaceAll(text,"?","%3F");
	text=ReplaceAll(text,"=","%3D");
	text=ReplaceAll(text,"$","%24");
	text=ReplaceAll(text,"!","%21");
	text=ReplaceAll(text,"(","%28");
	text=ReplaceAll(text,")","%29");
	text=ReplaceAll(text,"*","%2A");
	return text;
 }
function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 
function CheckPercentage(obj)
{
	if(trim(obj.value)!='')
	{
		if(isNaN(parseFloat(trim(obj.value))))
		{
			alert("|^Invalid Percentage.^|");
			obj.value="";
			obj.focus();
			return false;
		}
		if(parseFloat(obj.value)>99.99 || parseFloat(obj.value)<0)
		{
			alert("|^Invalid Percentage.^|");
			obj.value="";
			obj.focus();
			return false;
		}
		obj.value=Math.round(parseFloat(obj.value)*100)/100;
	}
	return true;
}

function is_valid_url(url){     
return url.match(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]{1,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?[a-zA-Z\-]$/)
}
function compareDates(FROM_DATE,TO_DATE,OPERATOR)//Comparing dates By value parameters sholud be value not object , like fromdate.value*
//Compare dates like 01/09/2004 & 01/10/90 including Y2K problem
{
 			if(FROM_DATE.length==10)
			{
			 	FROM_DATE =FROM_DATE.substr(6,4)+ FROM_DATE.substr(3,2)+FROM_DATE.substr(0,2);
			}
			else
			{
        yr = FROM_DATE.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        FROM_DATE = yr+FROM_DATE.substr(3,2)+FROM_DATE.substr(0,2);
    }
			if(TO_DATE.length==10)
			{
			 				TO_DATE =TO_DATE.substr(6,4)+ TO_DATE.substr(3,2)+TO_DATE.substr(0,2);
			}
			else
			{
        yr = TO_DATE.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        TO_DATE = yr+TO_DATE.substr(3,2)+TO_DATE.substr(0,2);
    		}
				var ret=eval("FROM_DATE"+OPERATOR+"TO_DATE");
				if(ret)
									return true;
				else
									return false;
							
}
function compareTimes(FromTime,ToTime,Operator)//Comparing time By value HH:MM only
{
	 var colIndex=FromTime.indexOf(':');
    var frhrs=FromTime.substr(0,2);
    var frmin=FromTime.substr(colIndex+1,2);
	colIndex=ToTime.indexOf(':');
    var tohrs=ToTime.substr(0,colIndex);
    var tomin=ToTime.substr(colIndex+1,2);
    
	var d1=new Date();
	d1.setHours(parseInt(frhrs,10));
	d1.setMinutes(parseInt(frmin,10));
	
	var d2=new Date();
	d2.setHours(parseInt(tohrs,10));
	d2.setMinutes(parseInt(tomin,10));
	
	var ret=eval("d1"+Operator+"d2");
	if(ret)
		return true;
	else
		return false;	
}
function checkPhoneNo(str,isd,std,pco)
{
 with(document.forms[0])
 { 
	var tempstr=str.value;
	var i=tempstr.indexOf("-",0);
	isd.value=tempstr.substring(0,i);
	tempstr=tempstr.slice(i+1);
	i=tempstr.indexOf("-",0);
	std.value=tempstr.substring(0,i)
	tempstr=tempstr.slice(i+1);
	pco.value=tempstr;
 }
}


function checkPhoneNo_New(str,isd,std,pco)
{
 with(document.forms[0])
 { 
	var tempstr=str.value;
	var TotLen =str.value.length;
	isd.value=tempstr.substring(0,3);
	pco.value=tempstr.substring(3,TotLen);
 }
}


function BuildPhoneNo(pn,isd,std,pco)
{
  with(document.forms[0])
  {
	 	pn.value=isd.value+'-'+std.value+'-'+pco.value;
	}
}

function BuildMobileNo(pn,isd,pco)
{

  with(document.forms[0])
  {
	 	 pn.value=isd.value+'-'+pco.value;
	}
}

function BuildMobileNonew(pn,isd,pco)
{

  with(document.forms[0])
	{
		if(isd.value!='' && pco.value!='')
	 	 pn.value=isd.value+pco.value;
		else
		pn.value='';
	}
}
/*
function getServerDate()
{
	/*var link1="[X]ReturnCurrentDateTime&ARGUMENTS="
	var urlOc = url+link1;
	if (window.ActiveXObject) {
			   xmlGetCount = new ActiveXObject('Msxml2.XMLHTTP.3.0'); // IE
	} 
	 else if (window.XMLHttpRequest) {
			   xmlGetCount = new XMLHttpRequest(); // Mozilla/Webkit/Opera
	}
	xmlGetCount.open("GET",urlOc, false);
    xmlGetCount.send();
	var xml = xmlGetCount.responseXML;
	var rt=xml.getElementsByTagName("Root").item(0);
	if(rt)
	{
		//return rt.getAttribute('Date');
	//}
}*/
function getFullServerDate()
{
	var link1="[X]ReturnCurrentDateTime&ARGUMENTS="
	var urlOc = url+link1;
	if (window.ActiveXObject) {
			   xmlGetCount = new ActiveXObject('Msxml2.XMLHTTP.3.0'); // IE
	} 
	 else if (window.XMLHttpRequest) {
			   xmlGetCount = new XMLHttpRequest(); // Mozilla/Webkit/Opera
	}
	xmlGetCount.open("GET",urlOc, false);
    xmlGetCount.send();
	var xml = xmlGetCount.responseXML;
	var rt=xml.getElementsByTagName("Root").item(0);
	if(rt)
	{
		return rt.getAttribute('FullDate');
	}
}
function getServerTime()
{
	var link1="[X]ReturnCurrentDateTime&ARGUMENTS="
	var urlOc = url+link1;
    var xmlGetCount = new ActiveXObject("Msxml2.XMLHTTP.3.0");
    xmlGetCount.open("GET",urlOc, false);
    xmlGetCount.send();
	var xml = xmlGetCount.responseXML;
	var rt=xml.getElementsByTagName("Root").item(0);
	if(rt)
	{
		return rt.getAttribute('Time');
	}
    
}
function selectRadio(objArr,selectedIndex)
{
	    var ind=0;
		if(selectedIndex=="")
			ind=0;
		else
			ind=parseInt(selectedIndex);
		
		if(objArr.length)
        {
            for (i=0;i<objArr.length;i++) 
            {
                if(i==selectedIndex) 
					objArr[i].checked=true;
				else
					objArr[i].checked=false;
            }
        }
        else
        {   
            objArr.checked=true;
        }
        return;
}
function checkDate(obj,checkFor) //checkFor='' then only date check ==P then past date ==F then future
{
	if(obj.value!='')
	{
		if(!isDate(obj))
		{
			obj.value='';
			obj.focus();
			return false;
		}
		if(checkFor=='F')
		{
			if(DateInFuture(obj))
			{
				obj.value='';
				obj.focus();
				return false;
			}
		}
		if(checkFor=='P')
		{
			if(DateInPast(obj))
			{
				obj.value='';
				obj.focus();
				return false;
			}
		}
	}
	return true;
}

	/*var ServerCurrentDate=new Date(today.getFullYear(),
	parseInt((today.getMonth() + 1).padStart(2, '0')),
	 (today.getDate()).padStart(2, '0'));*/
    var ServerCurrentDate=20210120

addEvent(window, "load", makeUpper_init);
addEvent(window, "load", f_setfocus);

function makeUpper_init()
{
		if (document.all && document.forms[0]) 
		{
		var focused=true;
      			for (i = 0; i < document.forms[0].length; i++) 
      			{
      			 			 	 	 var formElement = document.forms[0].elements[i];
											 //alert('c'+formElement.name+' '+formElement.type);		
											 									 
											 if(formElement.type=='text' || formElement.type=='textarea' || formElement.type=='select' || formElement.type=='select-one' || formElement.type=='button') 
											 {//alert('b'+formElement.name);alert(formElement.readOnly);
	                 				if(focused==false && ( formElement.disabled==false || formElement.disabled==undefined) && ( formElement.readOnly==false || formElement.readOnly==undefined) && (formElement.style.display=='' || formElement.style.display==undefined))
													{
    													formElement.focus();
    													focused=true;
                           }
                        }
                  				if(formElement.type=='text' || formElement.type=='textarea' || formElement.type=='Password')
													{
                					  formElement.attachEvent('onblur', setUpper);
													}
     					 }
		}
		//document.attachEvent('onkeydown',disable_f5);
		//document.attachEvent('oncontextmenu',DisableRClick);
		
}
function DisableRClick(){
	//return false;
}
function disable_f5(){
         var key_f5 = 116; // 116 = F5  
  if (key_f5==event.keyCode)
  {
           event.keyCode=0;
          return false;
  }
  /*else if(event.keyCode==8)//8 for back button
  {
        event.keyCode=0;
        return false;
  }*/
 }
function setUpper()
{
event.srcElement.value=event.srcElement.value.toUpperCase();
}
/*
if (document.all){	

	document.onkeyup = function ()
	{
		
//	      97 a 				122 z 				65 A 				90 Z 				
								if (event.keyCode>=65 && event.keyCode<=90)
								{
								event.keyCode=event.keyCode+32;
								}
		if (event.keyCode>=97 && event.keyCode<=122)
		{

				  					event.keyCode=event.keyCode-32;
  	}
	}
	
}
*/

function checkTime(obj)
{
	
	if(obj.value!='')
	{
		if(!TimeFormat(obj))
		{
		  obj.value='';
		  obj.focus();
		  return false;
		  		
			
		}

	}
	return true;
		
	
}
//This Code used For Setting Focus On First Availble Entery
function getParent(el){
	var obj = el;
	
	while(obj.style.display!=="none" && obj.tagName.toUpperCase()!=="body".toUpperCase() &&
	(obj.tagName.toUpperCase()!=="tr".toUpperCase() || obj.tagName.toUpperCase()!=="td".toUpperCase() ||obj.tagName.toUpperCase()!=="table".toUpperCase() ))
	{		obj = obj.parentNode;	}
	
	//alert(obj.tagName);
	
	if(obj.tagName.toUpperCase()=="body".toUpperCase())
	return true;
	
	
	return false;
	
}

//This Code Written by  Viraj
function f_setfocus()
{
var FormObject=document.forms[0];
	if(FormObject!=null)
	if( FormObject.elements[0]!=null) {
		//alert(window.name);
		
		var i;
		var max = FormObject.length;
		for( i = 0; i < max; i++ ) {
			if( FormObject.elements[ i ].type != "hidden" &&
				(FormObject.elements[ i ].type == "text" ||
				FormObject.elements[ i ].tagName.toUpperCase() == "select".toUpperCase()) &&
				!FormObject.elements[ i ].disabled &&
				!FormObject.elements[ i ].readOnly 				
				) {				
				 // alert(getParentTest(FormObject.elements[ i ]));
				    if(getParent(FormObject.elements[ i ]))				
				   {
						FormObject.elements[ i ].focus();
						//alert(FormObject.elements[ i ].name);
						break;
				   }
				   
			}
		}
	}
	//alert(document.activeElement.name);
}//This Code Written by Viraj and Ranjit,End Here

function GetXMLReceiveObject(){
	if(window.XMLHttpRequest)
		return (new XMLHttpRequest());
	else 
		return (new ActiveXObject("MSXML2.XMLHTTP.3.0"));
}


function getXMLParser(){

    if(window.DOMParser){
       return (new DOMParser());
    }else{
        return (new ActiveXObject("Microsoft.XMLDOM"));
    }	
}

function getXMLStringFromObject(xmlObjToConvertToString){
    if(window.DOMParser){
		return (new XMLSerializer()).serializeToString(xmlObjToConvertToString);
	}
	else{
		return xmlObjToConvertToString.xml;
	}
}
function createElementCommon(XMLVar2,globalXMLVar,elementString){
    if(window.DOMParser){
		return XMLVar2.createElement(elementString);
	}
	else{
		return globalXMLVar.createElement(elementString);
	}
}
function createAttributeCommon(XMLVar,globalXMLVar,elementString){
    if(window.DOMParser){
		return XMLVar.createAttribute(elementString);
	}
	else{
		return globalXMLVar.createAttribute(elementString);
	}
}

function appendNodeToParent(parentObject,ChildObject){
	if(window.DOMParser && parentObject.documentElement){
		parentObject.documentElement.appendChild(ChildObject);
	}
	else{
		parentObject.appendChild(ChildObject);
	}
}

function getXMLFirstElement(XMLVar,firstElementString){

    if(window.DOMParser){
	
		return XMLVar.parseFromString("<"+firstElementString+"/>", "text/xml"); 
    }else{
		var records=XMLVar.createElement(firstElementString);
		XMLVar.appendChild(records);

		var firstElement = XMLVar.getElementsByTagName(firstElementString).item(0);
		return firstElement;
        
    }	
}

function loadXMLCommon(xmlString){
    if(window.DOMParser){
		var parser = new DOMParser();
        return(parser.parseFromString(xmlString, "text/xml"));
	}
	else{
		var XMLDOMVAR = new ActiveXObject("Microsoft.XMLDOM")
		XMLDOMVAR.loadXML(xmlString);
		return XMLDOMVAR;
	}
}

function getElementValue(XMLVar,ElementString){
	if(window.DOMParser){
	var XparentNode;
	var XchildNode;		
		    var i=ElementString.indexOf('/');
		if(i > 0){
			while(i > 0){
				var ln=ElementString.length;
				var parent=ElementString.substring(0,i);
				var child=ElementString.substring(i+1,ln);
				ElementString = child
				XparentNode=XMLVar.getElementsByTagName(parent);
				if(ElementString.indexOf('/') > 0){
					XMLVar = XparentNode.item(0);
					i=ElementString.indexOf('/');
				}
				else{
					i = 0;
					if(((XparentNode[0]).getElementsByTagName(child)).length > 0){
						if((((XparentNode[0]).getElementsByTagName(child))[0]).firstChild)
							XchildNode=((XparentNode[0]).getElementsByTagName(child)[0]).firstChild.nodeValue;
						else
							XchildNode='';
					}
					else{
						XchildNode='';
					}
				}
				
			}
			return (XchildNode);
		}
		else{
			if((XMLVar.getElementsByTagName(ElementString)).length > 0 && (XMLVar.getElementsByTagName(ElementString))[0].firstChild)
				return ((XMLVar.getElementsByTagName(ElementString))[0].firstChild.nodeValue);
			else
				return '';
		}
	}
	else{
		if(XMLVar.getElementsByTagName(ElementString).item(0))
		return (XMLVar.getElementsByTagName(ElementString).item(0).text)
	}
}


function getXMLElementsArray(XMLVar,ElementString){
	if(window.DOMParser){
	var XparentNode;
	var XchildNode;
		    var i=ElementString.indexOf('/');
		if(i > 0){
			while(i > 0){
				var ln=ElementString.length;
				var parent=ElementString.substring(0,i);
				var child=ElementString.substring(i+1,ln);
				ElementString = child
				XparentNode=XMLVar.getElementsByTagName(parent);
	//			alert(parent);
//					alert(child);
				if(ElementString.indexOf('/') > 0){
					XMLVar = XparentNode.item(0);
					i=ElementString.indexOf('/');
				}
				else{
					i = 0;
					
					XchildNode=XparentNode.item(0).getElementsByTagName(child);
				}
				
			}
			return (XchildNode);
		}
		else{
			return (XMLVar.getElementsByTagName(ElementString));
		}
	}
	else{
		return (XMLVar.getElementsByTagName(ElementString))
	}
}

function setAttributeValueJQuery(tag,attribute,value,xmlObj)
{
	var x=$(xmlObj).find(tag)
	x[0].setAttribute(attribute,value);
	return value;
}

function loadXMLFileCommon(xmlFile){
if(window.DOMParser) {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",xmlFile,false);
    if (xmlhttp.overrideMimeType){
        xmlhttp.overrideMimeType('text/xml');
    }
    xmlhttp.send();
    return xmlhttp.responseXML;
}
else{
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async="false";
    xmlDoc.load(xmlFile);
	return xmlDoc;
}

}