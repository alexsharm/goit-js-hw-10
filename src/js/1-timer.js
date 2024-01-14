import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('.start-btn');
let userSelectedDate;
let timeLeft;
let timeLeftConverted;
let daysLeft = document.querySelector('[data-days]');
let hoursLeft = document.querySelector('[data-hours]');
let minutesLeft = document.querySelector('[data-minutes]');
let secondsLeft = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() <= 0) {
      startBtn.classList.remove('active-btn');
      iziToast.error({
        class: 'error-alert',
        message: 'Please choose a date in the future',
        close: true,
        iconUrl: './icons/x-octagon.svg',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#FFF',
        messageLineHeight: '150%',
        messageSize: '16px',
      });
    } else {
      startBtn.classList.add('active-btn');
      userSelectedDate = selectedDates[0];
    }
  },
};

const fp = flatpickr(dateInput, options);

startBtn.addEventListener('click', handleBtnClick);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function handleBtnClick() {
  fp.destroy();
  startBtn.classList.remove('active-btn');
  timeLeft = userSelectedDate.getTime() - Date.now();
  timeLeftConverted = convertMs(timeLeft);
  daysLeft.innerHTML = `${addLeadingZero(timeLeftConverted.days)}`;
  hoursLeft.innerHTML = `${addLeadingZero(timeLeftConverted.hours)}`;
  minutesLeft.innerHTML = `${addLeadingZero(timeLeftConverted.minutes)}`;
  secondsLeft.innerHTML = `${addLeadingZero(timeLeftConverted.seconds)}`;
  const intervalId = setInterval(() => {
    timeLeft = userSelectedDate.getTime() - Date.now();
    timeLeftConverted = convertMs(timeLeft);
    daysLeft.innerHTML = `${addLeadingZero(timeLeftConverted.days)}`;
    hoursLeft.innerHTML = `${addLeadingZero(timeLeftConverted.hours)}`;
    minutesLeft.innerHTML = `${addLeadingZero(timeLeftConverted.minutes)}`;
    secondsLeft.innerHTML = `${addLeadingZero(timeLeftConverted.seconds)}`;
    if (timeLeft < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}
