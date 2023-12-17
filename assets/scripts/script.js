'use strict';

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // global variable for current time
  var now = dayjs();

  // function to display the current date in the header
  // called by the same timer that updates the scheduler
  function displayDate() {
    $('#currentDay').text(now.format("dddd, MMMM D") + "th");
  }

  // initialize the displayed date and schedule when loaded
  function updateDisplay() {
    displayDate();  // put up the current date in header
    var currentHour = dayjs().hour();
    var blockHour;  // hour of the time block

    // select all the schedule divs
    var timeBlockEl = $("div.time-block");

    // remove the classes
    timeBlockEl.removeClass("present past future");

    // get array of hours for each block from the ID
    timeBlockEl.each(function (index) {
      blockHour = +$(this).attr("ID").split("-")[1];
      if (blockHour < currentHour) {
        // it is in the past
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        // it is in the current time block
        $(this).addClass("present");
      } else {
        // it is in the future
        $(this).addClass("future");
      }
    });
  }

  // add a timer; how often should it be updated? Every second, every minute?
  updateDisplay();
  setInterval(updateDisplay, 1000);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // also want to offer some visual feedback to the user when the data is saved, maybe
  // a momentary change in the background-color of the icon along with a brief "saved" message

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

}); // end ready function
