async function findImageByFD(model, files) {
  if (!files.length) {
    return '';
  }

  let reviewImage = await model.findOne({
    fd: files[0].fd,
  });

  return reviewImage.id;
}

async function findImageByID(model, id) {
  if (!id) {
    return '';
  }

  let placeImage = await model.findOne({
    id,
  });

  return `data:image/jpeg;base64,${placeImage.file}`;
}

module.exports = { findImageByFD, findImageByID };
