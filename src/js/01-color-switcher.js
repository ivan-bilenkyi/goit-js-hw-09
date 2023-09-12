const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

body.style.backgroundColor = localStorage.getItem('randomColor');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

start.addEventListener('click', () => {
  start.disabled = true;
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    localStorage.setItem('randomColor', randomColor);
    body.style.backgroundColor = randomColor;
  }, 1000);
});

stop.addEventListener('click', () => {
  start.disabled = false;
  clearInterval(timerId);
});
