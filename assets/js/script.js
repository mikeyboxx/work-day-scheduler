// var hoursArr = ['11AM', '12PM', '1PM', '2PM','3PM','4PM','6PM','7PM','8PM','9PM'];
var hoursArr = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM','3PM','4PM','5PM',];
var timeBlockObjArr = [];
var lastInputIdx = -1; 

// Get timeBlockObjArr from local storage
var localStorageArr = JSON.parse(localStorage.getItem('timeBlocks'));
// if first time initialize the array
if (localStorageArr === null){
    for (var i = 0; i < hoursArr.length; i++){
        timeBlockObjArr.push({
            time: hoursArr[i],
            text: ''
        })
    }
} else {
    timeBlockObjArr = localStorageArr;
}

// Get current Date and Time
var currentDate = moment();
var currentDateFormatted = currentDate.format('dddd, MMMM Do');
var currentHour = currentDate.format('hA');
// Render current Date
$('#current-day').text(currentDateFormatted);

// Render Time Blocks
for (var i = 0; i < timeBlockObjArr.length; i++){
    var currHour = currentHour.slice(0,-2);
    var timeBlockHour = timeBlockObjArr[i].time.slice(0,-2);
    var className = '';

    // check if time block hour is past, present, or future
    if (timeBlockHour <  currHour) {
        className = 'past';
    } else if(timeBlockHour ===  currHour){
        className = 'present';
    } else {
        className = 'future';
    }
    
    //generate HTML strings with classnames of past, present, future
    var rowStr = `<div class="row time-block" id="row-${i}"></div>`;
    var hourColStr = `<div class="col-1 hour" id="col-0-${i}">${timeBlockObjArr[i].time}</div>`;
    var textColStr = `<div class="col-10 ${className}" id="col-1-${i}"><textarea>${timeBlockObjArr[i].text}</textarea></div>`;
    var saveColStr = `<div class="col-1 saveBtn" id="col-2-${i}"><span>💾</span></div>`;
    
    // append row to the time block container
    $('#time-block-container').append(rowStr);
    // append hour, text, and save button columns to row container
    $(`#row-${i}`).append(hourColStr).append(textColStr).append(saveColStr);

    // add event listener to last column containing the save icon
    $(`#col-2-${i}`).on('click', function (event){
        event.stopPropagation();
        // get the index of the row that was clicked on
        var idx = Number($(event.target).parent().attr('id').at(-1));
        // if row is the same as last row clicked, save the textarea value in local storage, render message
        if (lastInputIdx === idx){
            var val = $(`#col-1-${idx} textarea`).val();
            timeBlockObjArr[idx].text = val;
            $('#save-message').text('Appointment added to local storage').append('<span style="color:red"> ⎷ </span>');
            localStorage.setItem('timeBlocks', JSON.stringify(timeBlockObjArr));
        }
    });
    
    // add event listener to text column, save the index of clicked row and clear out the save message
    $(`#col-1-${i}`).on('click', function (event){
        event.stopPropagation();
        var idx = Number($(event.target).parent().attr('id').at(-1));
        lastInputIdx = idx;
        $('#save-message').text('');
    });
}