module.exports = function destroy(req, res) {
  // ? Should I test that an id is received
  // console.log(req.param('id'));
  console.log(req.params);
  // console.log(reviewID);
  return res.redirect(`/places/1`);
};
