import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const inputDatePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');
let dedline;
let currentData;
let interval;
let diferenceTime;

startBtn.addEventListener('click', () => {
  interval = setInterval(() => {
    if (diferenceTime > 0) {
      diferenceTime -= 1000;
      convertMs(diferenceTime);
    }
  }, 1000);
});

const options = {
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    currentData = options.defaultDate.getTime();
    dedline = selectedDates[0];
    diferenceTime = dedline - currentData;
    convertMs(diferenceTime);

    if (diferenceTime < 0) {
      alert('Please choose a date in the future');
    }
  },
};

flatpickr(inputDatePicker, options);

function convertMs(ms) {
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

  spanDays.innerHTML = days;
  spanHours.innerHTML = hours;
  spanMinutes.innerHTML = minutes;
  spanSeconds.innerHTML = seconds;

  return { days, hours, minutes, seconds };
}
