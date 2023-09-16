import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const imputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
btnStart.setAttribute('disabled', true);

let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getDifferenceTime(selectedDates[0], options.defaultDate);
  },
};

flatpickr(imputDate, options);

function getDifferenceTime(selectedDate, defaultDate) {
  clearInterval(timerId);

  timeDifference = selectedDate - defaultDate;

  if (timeDifference <= 0) {
    Notify.failure('Please choose a date in the future');
    btnStart.setAttribute('disabled', true);
    return;
  }
  btnStart.removeAttribute('disabled');
  formatDate = convertMs(timeDifference);

  btnStart.addEventListener('click', startTimer);
}
function startTimer() {
  btnStart.setAttribute('disabled', true);
  updateTimerDisplay();
  timerId = setInterval(updateTimerDisplay, 1000);
}
function updateTimerDisplay() {
  if (timeDifference <= 0) {
    clearInterval(timerId);
    //   Notify.success('Time is up!');
    return;
  }

  formatDate = convertMs(timeDifference);

  days.textContent = formatDate.days.toString().padStart(2, '0');
  hours.textContent = formatDate.hours.toString().padStart(2, '0');
  minutes.textContent = formatDate.minutes.toString().padStart(2, '0');
  seconds.textContent = formatDate.seconds.toString().padStart(2, '0');

  timeDifference -= 1000;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
