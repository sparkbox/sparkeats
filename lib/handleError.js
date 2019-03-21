function handleError(res, error) {
  if (
    error.message === 'image-too-big' ||
    error.raw.code === 'ER_NET_PACKET_TOO_LARGE'
  ) {
    return res.redirect('/places/new?error=image-too-big');
  }

  return res.redirect('/places/new?error=upload-error');
}
module.exports = handleError;
