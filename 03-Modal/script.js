'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.show-modal'); // Qalinstead of first one.
const btnCloseModal = document.querySelector('.close-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  console.log(btnsOpenModal.length);
  btnsOpenModal[i].addEventListener('click', openModal);
}

overlay.addEventListener('click', closeModal);

// Whenever a event listener listen any event from keyboard or mouse it will make a object which contains all the information about the event.
// for keyboard we have three event : keydown,keypress and keyup.
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
