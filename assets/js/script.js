
var timeBlockObjArr = [];  // array of time block objs saved/retrieved from local storage
var lastInputIdx = -1;     // index of the last time block clicked on

// Get timeBlockObjArr from local storage
var localStorageArr = JSON.parse(localStorage.getItem('timeBlocks'));

// if first time initialize the array
var fromhour = 9;
var toHour = 17;
if (localStorageArr === null){
    for (var i = fromhour; i <= toHour; i++){
        timeBlockObjArr.push({
            time: i,
            text: ''
        })
    }
} else {
    timeBlockObjArr = localStorageArr;
}

// Get current Date and Time
var currentDate = moment();
var currentDateFormatted = currentDate.format('dddd, MMMM Do');  
var currentHour = currentDate.get('hour');   // 24hr format

// Render current Date
$('#current-day').text(currentDateFormatted);

// Render Time Blocks
// check if time block hour is past, present, or future
var className = '';
for (var i = 0; i < timeBlockObjArr.length; i++){
    if (timeBlockObjArr[i].time <  currentHour) {
        className = 'past';
    } else if(timeBlockObjArr[i].time ===  currentHour){
        className = 'present';
    } else {
        className = 'future';
    }
    
    // format the time
    var timeText = '';
    if (timeBlockObjArr[i].time === 12){
        timeText = timeBlockObjArr[i].time + 'PM';
    } else {
        timeText = (timeBlockObjArr[i].time > 12) ? (timeBlockObjArr[i].time - 12) + 'PM' : timeBlockObjArr[i].time + 'AM';
    }
    
    //generate HTML strings with classnames of past, present, future
    var rowStr = `<div class="row time-block" id="row-${i}"></div>`;
    var hourColStr = `<div class="col-1 hour" id="col-0-${i}">${timeText}</div>`;
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
        // get the id of the dom element row 
        var idx = Number($(this).attr('id').at(-1));
        lastInputIdx = idx;
        $('#save-message').text('');
    });
}

// remove local storage and the events text from all time blocks on the page
$('.btn-clear').on('click', function (event){
    event.stopPropagation();
    localStorage.removeItem('timeBlocks');

    for (var i = 0; i < timeBlockObjArr.length; i++){
        $(`#col-1-${i} textarea`).val('');
        timeBlockObjArr[i].text = '';
    }
})