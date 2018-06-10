var $calenderTitle = document.querySelector('#calender h3');
var $calenderTableBody = document.querySelector('#calender table tbody');
var $calenderTableHead = document.querySelector('#calender table thead tr');
var monthDayCounts = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const initDate = new Date();
const initMonth = initDate.getMonth();
const initYear = initDate.getFullYear();
var currentMonth = initMonth;
var currentYear = initYear;
var startOfWeek = 3;

renderWeekDaysHeadings(startOfWeek);
updateCalender();

function nextClicked() {
    if (currentMonth == 11) {
        currentYear++;
        currentMonth = 0;
    } else {
        currentMonth++;
    }
    updateCalender();
}

function prevClicked() {
    if (currentMonth == 0) {
        currentYear--;
        currentMonth = 11;
    } else {
        currentMonth--;
    }
    updateCalender();
}

function updateCalender() {

    if (isCurrentYearLeap())
        monthDayCounts[1] = 29;
	else monthDayCounts[1] = 28;

    var daysFromPrevMonth = getDaysFromPrevMonth();

    var calender = [];
    calender[0] = [];

	var prevMonth = getPreviousMonth();
	
	for (var i = 0; i < daysFromPrevMonth; i++){
		calender[0].unshift(monthDayCounts[prevMonth] - i);
	}
            
    var dayToPush = 1;
    while(calender[0].length < 7){
        calender[0].push(dayToPush++);
    }

    for(var i=1;i<6;i++){
        calender[i] = [];
        while(calender[i].length < 7){
            if(dayToPush > monthDayCounts[currentMonth]) dayToPush = 1;
            calender[i].push(dayToPush++);
        }
    }

	
// Now Render The Calender
	// for(var i = startOfWeek;i<weekDays.length;i++){
		// renderWeekDay(weekDays[i]);
	// }
	// for(var i = 0;i< startOfWeek;i++){
		// renderWeekDay(weekDays[i]);
	// }
	
    $calenderTitle.innerText = monthNames[currentMonth] + " " + currentYear;

    $calenderTableBody.innerHTML = '';
	
    for (var i = 0; i < calender.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < calender[i].length; j++) {
            var td = document.createElement('td');
            td.innerText = calender[i][j];
            tr.appendChild(td);
        }
        $calenderTableBody.appendChild(tr);
    }
}


function renderWeekDay(day){
	var th = document.createElement('th');
	th.innerText = day;
	$calenderTableHead.appendChild(th);
}


function getDaysFromPrevMonth(){
	var firstDayofMonth = new Date(currentYear, currentMonth, 1);

    var daysFromPrevMonth = firstDayofMonth.getDay() - startOfWeek;
	
	if(daysFromPrevMonth < 0) {
		daysFromPrevMonth += 7;
	}

	return daysFromPrevMonth;
	
}

function isCurrentYearLeap(){
	return (currentYear % 4 == 0 && currentYear % 100 != 0) || (currentYear % 400 == 0)
}

function getPreviousMonth(){
	return currentMonth == 0 ? 11 : currentMonth - 1;
}

function backToToday(){
	currentMonth = initMonth;
	currentYear = initYear;
	updateCalender();
}

function renderWeekDaysHeadings(){
	$calenderTableHead.innerHTML = '';
	for(var i = 0; i < weekDays.length; i++){
		var th = document.createElement('th');
		th.innerText = weekDays[startOfWeek];
		$calenderTableHead.appendChild(th);
		startOfWeek++;
		if(startOfWeek === 7) startOfWeek = 0;
	}
}

function changeStartOfTheWeek(sw){
	startOfWeek = sw;
	renderWeekDaysHeadings();
	updateCalender();
}