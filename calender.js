var $calenderTitle = document.querySelector('#calender h3');
var $calenderTableBody = document.querySelector('#calender table tbody');
var monthDayCounts = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var currentDate = new Date();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();
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

    if ((currentYear % 4 == 0 && currentYear % 100 != 0) || (currentYear % 400 == 0))
        monthDayCounts[1] = 29;
	else monthDayCounts[1] = 28;
    var firstDayofMonth = new Date(currentYear, currentMonth, 1);

    var daysFromPrevMonth = firstDayofMonth.getDay();

    var calender = [];
    calender[0] = [];

    if (daysFromPrevMonth > 0) {
        var prevMonth = currentMonth == 0 ? 11 : currentMonth - 1;
        for (var i = 0; i < daysFromPrevMonth; i++)
            calender[0].unshift(monthDayCounts[prevMonth] - i)

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