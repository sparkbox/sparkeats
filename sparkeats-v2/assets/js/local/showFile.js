document.addEventListener('DOMContentLoaded', () => {
  const fileFormField = document.querySelector('.form__field--file');
  const fileInput = document.querySelector('.form__file-input');
  const removeFile = document.querySelector('.form__remove-file');
  const fileName = document.querySelector('.form__file-name');
  const altInput = document.querySelector('.form__input--image-alt');

  fileInput.addEventListener('change', event => {
    if (!fileInput.value) {
      fileFormField.style.display = 'none';
      altInput.value = "";
    } else {
      fileFormField.style.display = 'block';
      fileName.innerText = event.target.value.split("\\").pop();
    }
  });

  removeFile.addEventListener('click', () => {
    fileInput.value = "";
    altInput.value = "";
    fileName.innerText = "";

    fileFormField.style.display = 'none';
  });
});