// Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

function showTab(index) {
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
    tabPanels[i].classList.remove('active');
  }
  tabButtons[index].classList.add('active');
  tabPanels[index].classList.add('active');
}

for (let i = 0; i < tabButtons.length; i++) {
  tabButtons[i].addEventListener('click', function () {
    showTab(i);
  });
}

// Join form
const form = document.querySelector('#join-form');
const nameInput = document.querySelector('#name');
const daySelect = document.querySelector('#day');
const joinButton = document.querySelector('#join-btn');
const message = document.querySelector('#message');

function showMessage(text, type) {
  message.textContent = text;
  message.className = 'message ' + type;
}

function checkForm() {
  const name = nameInput.value.trim();
  joinButton.disabled = name.length < 2 || daySelect.value === '';
}

function handleNameInput() {
  const name = nameInput.value.trim();

  if (name === '') {
    showMessage('이름을 입력해주세요.', 'error');
  } else if (name.length < 2) {
    showMessage('이름은 2글자 이상 입력해주세요.', 'error');
  } else if (daySelect.value === '') {
    showMessage(name + '님, 참가할 요일을 선택해주세요.', 'info');
  } else {
    showMessage('신청하기 버튼을 눌러 참가 신청을 완료해주세요.', 'info');
  }

  checkForm();
}

function handleDayChange() {
  if (daySelect.value === '') {
    showMessage('참가 요일을 선택해주세요.', 'error');
  } else {
    showMessage(daySelect.value + ' 러닝을 선택했어요.', 'success');
  }

  checkForm();
}

function handleSubmit(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  showMessage(
    name + '님, ' + daySelect.value + ' 러닝 참가 신청이 완료됐어요!',
    'success',
  );
  joinButton.textContent = '신청 완료';
  joinButton.disabled = true;
  nameInput.disabled = true;
  daySelect.disabled = true;
}

nameInput.addEventListener('input', handleNameInput);
daySelect.addEventListener('change', handleDayChange);
form.addEventListener('submit', handleSubmit);
