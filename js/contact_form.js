const form = document.querySelector('.contact__form');
const submitBtn = document.querySelector('.contact__submit-btn');

const hideAlert = () =>
  document.querySelector('.alert') &&
  document.querySelector('.alert').classList.add('animateTopOut');

const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type} animateTop">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  setTimeout(hideAlert, 2000);
};

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');

  const nameValue = name.value;
  const emailValue = email.value;
  const messageValue = message.value;

  let invalid = false;

  if (!nameValue) {
    name.style.borderBottom = '3px #c72c41 solid';
    invalid = true;
  } else {
    name.style.borderBottom = 'none';
  }

  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailValue.toLowerCase()
    )
  ) {
    email.style.borderBottom = '3px #c72c41 solid';
    invalid = true;
  } else {
    email.style.borderBottom = 'none';
  }

  if (!messageValue) {
    message.style.borderBottom = '3px #c72c41 solid';
    invalid = true;
  } else {
    message.style.borderBottom = 'none';
  }

  if (invalid) return;

  const http = new XMLHttpRequest();
  const url = `https://us-central1-greensat-9087a.cloudfunctions.net/sendSMS?from=Aarush&message=New contact from beatingpoverty.co.in! Name: ${nameValue}, Email: ${emailValue} and Message: ${messageValue}`;
  http.open('GET', url);
  http.send();

  http.onreadystatechange = (e) => {
    name.value = '';
    email.value = '';
    message.value = '';
    showAlert('success', 'Message sent successfully!');
  };
});
