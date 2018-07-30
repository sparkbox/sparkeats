document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const openButtons = document.querySelectorAll('.btn--link');
  const closeButton = document.querySelector('.modal__close-button');

  function toggleModal() {
    modal.classList.toggle('modal--open');
  }

  function windowOnClick(event) {
    if (event.target === modal) {
      toggleModal();
    }
  }

  openButtons.forEach(openButton => {
    openButton.addEventListener('click', toggleModal);
  });

  closeButton.addEventListener('click', toggleModal);
  document.addEventListener('click', windowOnClick);
});
