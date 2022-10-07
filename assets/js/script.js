//DOM Dependencies
//  current date box
//  saved to local storage msg box
//  time block box container
//  time block box card
//     save button
//     input textarea 

//User Interactions
//  User navigates/refreshes to page
//    - display current date in title   done
//    - retrieve array of time blocks from local storage
//    - generate time blocks that contain the hour, event text, and save button    done
//    - mark the current hour red, past hour gray, future hours green
//  User clicks on a time block
//    - if time block is green, then make the time block text enterable
//    - change the cursor type to be something else
//
//  User types in the time block
//    
//  User clicks on the save button
//    - save the entered text in the two dimensional array
//    - save to local storage
//    - display 'save to local storage ⎷' under current date in title
//
// User hovers over save button 
//    - change the pointer display
//    

// DATA
// need to get current date, verbose
// need to have an two-dimensional array of hours from 9am to 5pm, and event text
// need to retrieve the two-dimensional srray from local storage

// FUNCTIONS




// var hoursArr = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM','3PM','4PM','5PM',];
var hoursArr = ['11AM', '12PM', '1PM', '2PM','3PM','4PM','6PM','7PM','8PM','9PM'];
var timeBlockObjArr = [];









// INITIALIZATION

// Get current Date and Time
var currentDate = moment();
var currentDateFormatted = currentDate.format('dddd, MMMM Do');
var currentHour = currentDate.format('hA');

// Render current Date
$('#current-day').text(currentDateFormatted);

// Get timeBlockObjArr from local storage
var localStorageArr = JSON.parse(localStorage.getItem('timeBlocks'));

console.log(localStorageArr);

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


var lastInputIdx = -1; 

// Render timeBlockObjArr
for (var i = 0; i < timeBlockObjArr.length; i++){
    var currHour = currentHour.slice(0,-2);
    var timeBlockHour = timeBlockObjArr[i].time.slice(0,-2);
    var className = '';


    if (timeBlockHour <  currHour) {
        className = 'past';
    } else if(timeBlockHour ===  currHour){
        className = 'present';
    } else {
        className = 'future';
    }


    var rowStr = `<div class="row time-block" id="row-${i}"></div>`;
    var hourColStr = `<div class="col-1 hour" id="col-0-${i}">${timeBlockObjArr[i].time}</div>`;
    var textColStr = `<div class="col-10 ${className}" id="col-1-${i}"><textarea>${timeBlockObjArr[i].text}</textarea></div>`;
    var saveColStr = `<div class="col-1 saveBtn" id="col-2-${i}"><span>💾</span></div>`;

   
   

    $('#time-block-container').append(rowStr);
    $(`#row-${i}`).append(hourColStr).append(textColStr).append(saveColStr);

    //  $(`col-1-${i}`).addClass(className);

   


    // add event listener to last column containing the save icon
    $(`#col-2-${i}`).on('click', function (event){
        event.stopPropagation();
        // get the index of the row
        var idx = Number($(event.target).parent().attr('id').at(-1));
        
        if (lastInputIdx === idx){
            var val = $(`#col-1-${idx} textarea`).val();
            
            timeBlockObjArr[idx].text = val;
            $('#save-message').text('Appointment added to local storage').append('<span style="color:red"> ⎷ </span>');
            localStorage.setItem('timeBlocks', JSON.stringify(timeBlockObjArr));
        }
        
    });
    
    $(`#col-1-${i}`).on('click', function (event){
        event.stopPropagation();
        var idx = Number($(event.target).parent().attr('id').at(-1));
        console.log(lastInputIdx, idx);
        lastInputIdx = idx;
        $('#save-message').text('');
    });
}




//     

// USER INTERACTIONS
//    click on event text column
//        on mouse down change cursor type
//        on mouse up restore pointer
//    click on save button
//        save the current Time block in user array
//        save to local storage
//        Render saved message 
//        set flag that it was saved
//
//    click anywhere
//        if saved flag is true Re-render blank saved message  

