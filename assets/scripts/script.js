'use strict';

$(function () {
  /////////////////////////////////////////////////////////////////////////////
  //                           Function Definitions                          //
  /////////////////////////////////////////////////////////////////////////////

  // function to display the current date in the header
  // called by the same timer that updates the scheduler colors
  function displayDate() {
    $('#currentDay').text(dayjs().format("dddd, MMMM D") + "th");
  }

  // function called by the timer
  function updateBlockColors() {
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

  /*
   * Three functions involving the workday array are below.
   * The "workday" array is local variable for each function. It is an
   * array of strings whose index is the hour that the string describes.
   * This leads to a somewhat sparse array but allows later change of the
   * html (ie, expansion or contraction of what constitutes a workday).
   */

  // function to retrieve data from local storage
  // new workdays result in a clean slate, returning an empty array
  function getWorkday() {
    var date = localStorage.date;
    var workday = localStorage.workday;
    if (date === undefined) { return [];}
    if (localStorage.date === dayjs().format("YYYY-MM-DD") && workday !== undefined) {
      return JSON.parse(workday);
    } else {
      // assuming for a new day we clear the entries
      return [];
    }
  }

  // function to update display of workday in window
  function showWorkday(workday) {
    $("textarea.description").each(function (index) {
      // get the hour from the ID of the div container
      var hour = +$(this).closest("div.time-block").attr("ID").split("-")[1];
      // display if not null or undefined
      if (workday[hour] != null || workday[hour] != undefined) {
        $(this).val(" " + workday[hour]);
      } else {
        // populate "missing" hours with spaces, like the initial file
        $(this).val(" ");
      }
    });
  }

  // function to write data to local storage (clears it first)
  function saveWorkday(workday) {
    localStorage.date = dayjs().format("YYYY-MM-DD");
    localStorage.workday = JSON.stringify(workday);
  }

  /////////////////////////////////////////////////////////////////////////////
  //                       Update display and set timer                      //
  /////////////////////////////////////////////////////////////////////////////

  // update the date and the background-colors
  updateBlockColors();
  // add a timer to update colors as the day progresses
  // (how often should it be updated? Every second, every minute?)
  setInterval(updateBlockColors, 1000);

  // update the text being displayed
  showWorkday(getWorkday());

  /////////////////////////////////////////////////////////////////////////////
  //                         Click listener to save item                     //
  /////////////////////////////////////////////////////////////////////////////

  // TODO also want to offer some visual feedback to the user when the data is saved, maybe
  // a momentary change in the background-color of the icon along with a brief "saved" message
  $("div.container-lg").click( function(evt) {
    // only act if the save icon or its button was clicked. In both cases the class name contains "save"
    if ($(evt.target).attr("class").includes("save")) {
      // first get the current workday
      var workday = getWorkday();
      // now get the text in the textarea input (and its hour)
      var timeBlockEl = $(evt.target.closest(".time-block"));
      var hour = +timeBlockEl.attr("ID").split("-")[1];
      var desc = timeBlockEl.find("textarea").val().trim();
      workday[hour] = desc;
      // now save to local storage
      saveWorkday(workday);
    }
  });

}); // end document ready function
