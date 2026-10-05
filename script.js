const form = document.querySelector('#subscribe-form');
const emailInput = document.querySelector('#email');
const button = document.querySelector('#subscribe-btn');
const message = document.querySelector('#message');

function showMessage(text, type) {
  message.textContent = text;
  message.className = 'message ' + type;
}

function handleSubmit(event) {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (email === '') {
    showMessage('이메일을 입력해주세요.', 'error');
  } else if (!email.includes('@') || !email.includes('.')) {
    showMessage('이메일 형식이 올바르지 않습니다. 다시 확인해주세요.', 'error');
  } else {
    showMessage(email + ' 주소로 훈련 소식을 보내드릴게요.', 'success');
    button.textContent = '신청 완료';
    button.disabled = true;
    emailInput.disabled = true;
  }
}

form.addEventListener('submit', handleSubmit);
