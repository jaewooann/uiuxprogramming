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

// Join flow
const form = document.querySelector('#join-form');
const steps = document.querySelectorAll('.step');
const stepItems = document.querySelectorAll('.step-list li');
const nameInput = document.querySelector('#name');
const daySelect = document.querySelector('#day');
const paceRadios = document.querySelectorAll('input[name="pace"]');
const nameMessage = document.querySelector('#name-message');
const choiceMessage = document.querySelector('#choice-message');
const doneMessage = document.querySelector('#done-message');

let currentStep = 0;

function goToStep(index) {
  steps[currentStep].classList.remove('active');
  stepItems[currentStep].classList.remove('current');
  steps[index].classList.add('active');
  stepItems[index].classList.add('current');
  currentStep = index;
}

function showMessage(target, text, type) {
  target.textContent = text;
  target.className = 'message ' + type;
}

function clearMessage(target) {
  target.textContent = '';
  target.className = 'message';
}

function getPace() {
  for (let i = 0; i < paceRadios.length; i++) {
    if (paceRadios[i].checked) {
      return paceRadios[i].value;
    }
  }
  return '';
}

// Step 2: name
function handleNameInput() {
  const name = nameInput.value.trim();

  if (name === '') {
    showMessage(nameMessage, '이름을 입력해주세요.', 'error');
  } else if (name.length < 2) {
    showMessage(nameMessage, '이름은 2글자 이상 입력해주세요.', 'error');
  } else {
    showMessage(nameMessage, name + '님, 반가워요! 다음 버튼을 눌러주세요.', 'info');
    nameInput.classList.remove('input-error');
  }
}

function handleNameNext() {
  const name = nameInput.value.trim();

  if (name.length < 2) {
    showMessage(
      nameMessage,
      '이름 입력칸에 2글자 이상 입력한 뒤 다음 버튼을 눌러주세요.',
      'error',
    );
    nameInput.classList.add('input-error');
    return;
  }

  goToStep(2);
}

// Step 3: day and pace
function handleDayChange() {
  if (daySelect.value === '') {
    showMessage(choiceMessage, '참가 요일을 선택해주세요.', 'error');
  } else {
    showMessage(choiceMessage, daySelect.value + ' 러닝을 선택했어요.', 'success');
    daySelect.classList.remove('input-error');
  }
}

function handlePaceChange() {
  showMessage(choiceMessage, getPace() + '을 선택했어요.', 'success');
}

function handleChoiceNext() {
  const day = daySelect.value;
  const pace = getPace();

  if (day === '' && pace === '') {
    showMessage(
      choiceMessage,
      '참가 요일과 페이스 그룹을 모두 선택한 뒤 다음 버튼을 눌러주세요.',
      'error',
    );
  } else if (day === '') {
    showMessage(choiceMessage, '참가 요일 목록에서 요일을 선택해주세요.', 'error');
  } else if (pace === '') {
    showMessage(choiceMessage, '페이스 그룹 중 하나를 선택해주세요.', 'error');
  }

  if (day === '') {
    daySelect.classList.add('input-error');
  }
  if (day === '' || pace === '') {
    return;
  }

  fillConfirm();
  goToStep(3);
}

// Step 4: confirm
function fillConfirm() {
  document.querySelector('#confirm-name').textContent = nameInput.value.trim();
  document.querySelector('#confirm-day').textContent = daySelect.value;
  document.querySelector('#confirm-pace').textContent = getPace();
}

function handleSubmit(event) {
  event.preventDefault();

  if (currentStep !== 3) {
    return;
  }

  doneMessage.textContent =
    nameInput.value.trim() +
    '님, ' +
    daySelect.value +
    ' ' +
    getPace() +
    ' 러닝 신청이 완료됐어요!';
  goToStep(4);
}

// Step 5: restart
function handleRestart() {
  form.reset();
  clearMessage(nameMessage);
  clearMessage(choiceMessage);
  doneMessage.textContent = '';
  nameInput.classList.remove('input-error');
  daySelect.classList.remove('input-error');
  goToStep(0);
}

document.querySelector('#start-btn').addEventListener('click', function () {
  goToStep(1);
});
document.querySelector('#name-prev-btn').addEventListener('click', function () {
  goToStep(0);
});
document.querySelector('#name-next-btn').addEventListener('click', handleNameNext);
document.querySelector('#choice-prev-btn').addEventListener('click', function () {
  goToStep(1);
});
document.querySelector('#choice-next-btn').addEventListener('click', handleChoiceNext);
document.querySelector('#confirm-prev-btn').addEventListener('click', function () {
  goToStep(2);
});
document.querySelector('#restart-btn').addEventListener('click', handleRestart);

nameInput.addEventListener('input', handleNameInput);
daySelect.addEventListener('change', handleDayChange);
for (let i = 0; i < paceRadios.length; i++) {
  paceRadios[i].addEventListener('change', handlePaceChange);
}
form.addEventListener('submit', handleSubmit);
