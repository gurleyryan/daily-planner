// Wrapped code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // Listener for click events on the save button using the id in the containing 
  // time-block as a key to save the user input in local storage.
  $(".saveBtn").on('click', function () {
    const descriptionInput = $(this).siblings('.description').val();
    const timeBlockId = $(this).closest('.time-block').attr('id');

    localStorage.setItem(timeBlockId, descriptionInput);
  });
  // Code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
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
  // Code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. 
  $(".time-block").each(function () {
    const blockId = $(this).attr('id');
    const saveUserInput = localStorage.getItem(blockId);

    if (saveUserInput !== null) {
      $(this).children('.description').val(saveUserInput);
    } else if (currentHour >= 18) {
      clear(saveUserInput);
    }
  });
  // Code to display the current date in the header of the page.
  const yearDisplay = $('#year');
  yearDisplay.text(dayjs().format('YYYY'));
  const dateDisplay = $('#date');
  dateDisplay.text(dayjs().format('dddd, MMMM D YYYY'));
  const timeDisplay = $('#time');
  timeDisplay.text(dayjs().format('h:mm:ss a'));
  updateTime = () => { timeDisplay.text(dayjs().format('h:mm:ss a')); }
  setInterval(updateTime, 1000);
});
