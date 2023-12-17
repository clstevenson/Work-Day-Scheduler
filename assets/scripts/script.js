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

  // initialize the displayed date when loaded
  displayDate();

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // define the function that will be called by the timer
  // call the function before setting the timer to avoid the delay (unless the delay is short?)

  // set up a timer, check it every minute (half-minute? second? Is performance even an issue?)

  // if the date doesn't match that displayed in header, update the header
  // note that some string manipulation and dayjs will be required

  // if the hour changes, update the schedule display
  // set up a variable to track the hour
  // if it changes then change the class of the corresponding time block

  // also need an initialization when the page is first loaded (outside of the interval code?)
  // or maybe the event timer just updates all of the blocks. Seems a little unnecessary


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
