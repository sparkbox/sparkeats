document.addEventListener('DOMContentLoaded', () => {
  const fileFormField = document.querySelector('.form__field--file');
  const fileInput = document.querySelector('.form__file-input');
  const removeFile = document.querySelector('.form__remove-file');
  const fileName = document.querySelector('.form__file-name');
  const altInput = document.querySelector('.form__input--image-alt');

  fileInput.addEventListener('change', event => {
    if (!fileInput.value) {
      fileFormField.style.display = 'none';
      altInput.value = '';
      altInput.required = false;
    } else {
      fileFormField.style.display = 'block';
      fileName.innerText = event.target.value.split('\\').pop();
      altInput.required = true;
    }
  });

  removeFile.addEventListener('click', () => {
    fileFormField.style.display = 'none';
    fileInput.value = '';
    fileName.innerText = '';
    altInput.value = '';
    altInput.required = false;
  });
});
