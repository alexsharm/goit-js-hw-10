import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const btnState = document.querySelector('input[name="state"]:checked').value;
  const delay = document.querySelector('.delay-input').value;
  const promise = new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      if (btnState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
  form.reset();
});
