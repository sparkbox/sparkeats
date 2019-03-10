function replaceState(url) {
  return window.history.replaceState(null, null, url);
}

document.addEventListener('DOMContentLoaded', () => {
  const fileFormField = document.querySelector('.form__field--hidden');
  const fileInput = document.querySelector('.form__file-input');
  const removeFile = document.querySelector('.form__remove-file');
  const fileName = document.querySelector('.form__file-name');
  const altInput = document.querySelector('.form__input--image-alt');
  const errorMessage = document.querySelector('.form__error');

  fileInput.addEventListener('change', event => {
    if (!fileInput.value) {
      fileFormField.classList.add('form__field--hidden');
      altInput.value = '';
      altInput.required = false;
    } else if (fileInput.files[0].size > 5000000) {
      replaceState('?error=image-too-big');
      errorMessage.classList.remove('form__error--hidden');
    } else {
      replaceState('new');
      errorMessage.classList.add('form__error--hidden');
      fileFormField.classList.remove('form__field--hidden');
      fileName.innerText = event.target.value.split('\\').pop();
      altInput.required = true;

      removeFile.addEventListener('click', () => {
        fileFormField.classList.add('form__field--hidden');
        fileInput.value = '';
        fileName.innerText = '';
        altInput.value = '';
        altInput.required = false;
      });
    }
  });
});
