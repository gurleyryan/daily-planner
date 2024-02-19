// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").on('click', function () {
    const descriptionInput = $(this).siblings('.description').val();
    const timeBlockId = $(this).closest('.time-block').attr('id');

    localStorage.setItem(timeBlockId, descriptionInput);
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  const currentHour = dayjs().format('HH');

  $(".time-block").each(function () {
    const blockHour = parseInt($(this).attr('id').split('-')[1]);
    const textarea = $(this).children(".description");

    if (blockHour < currentHour) {
      textarea.addClass('past');
    } else if (blockHour == currentHour) {
      textarea.addClass('present');
    } else {
      textarea.addClass('future');
    }
  });
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $(".time-block").each(function () {
    const blockId = $(this).attr('id');
    const saveUserInput = localStorage.getItem(blockId);

    if (saveUserInput !== null) {
      $(this).children('.description').val(saveUserInput);
    } else if (currentHour >= 18) {
      clear(saveUserInput);
    }
  });
  // TODO: Add code to display the current date in the header of the page.
  const yearDisplay = $('#year');
  yearDisplay.text(dayjs().format('YYYY'));
  const dateDisplay = $('#date');
  dateDisplay.text(dayjs().format('dddd, MMMM D YYYY'));
  const timeDisplay = $('#time');
  timeDisplay.text(dayjs().format('h:mm:ss a'));
  updateTime = () => { timeDisplay.text(dayjs().format('h:mm:ss a')); }
  setInterval(updateTime, 1000);
});
