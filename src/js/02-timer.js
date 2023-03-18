import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  inputDate:document.querySelector('input#datetime-picker'),
  btnStart:document.querySelector('button[data-start]'),
  daysCount:document.querySelector('[data-days]'),
  hoursCount:document.querySelector('[data-hours]'),
  minutesCount:document.querySelector('[data-minutes]'),
  secondsCount:document.querySelector('[data-seconds]'),
};
let intervalId = null;
let selectedDate = null;
let currentDate = null;

refs.btnStart.setAttribute('disabled',true);
refs.btnStart.addEventListener('click', onClickStart)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateCheck(selectedDates);
  },
};
flatpickr(refs.inputDate, options);

function onDateCheck(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();
  
  if (selectedDate > currentDate) {
    refs.btnStart.removeAttribute('disabled');
    Report.success(
      'Click on start!'
    );
    return;
  }
    Report.failure(
      'Please choose a date in the future'
    );
};

function onClickStart() {
  intervalId = setInterval(() => {
  currentDate = new Date().getTime(); 
  if (selectedDate - currentDate <= 1000) {
    clearInterval(intervalId);
    // refs.btnStart.setAttribute('disabled',true);
    refs.inputDate.removeAttribute('disabled');
    Report.info(
      'Timer stopped!',
    );
    return
  } else {
    // refs.btnStart.setAttribute('disabled',true);
    refs.inputDate.setAttribute('disabled',true);
    currentDate += 1000;
    remainingTime = Math.floor(selectedDate - currentDate);
    convertMs(remainingTime);
  }
  },1000)
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes =addLeadingZero( Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero (Math.floor((((ms % day) % hour) % minute) / second));
  createMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
};
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};
function createMarkup({ days, hours, minutes, seconds }) {
  refs.daysCount.textContent = days;
  refs.hoursCount.textContent = hours;
  refs.minutesCount.textContent = minutes;
  refs.secondsCount.textContent = seconds;
};