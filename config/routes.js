module.exports.routes = {
  'GET /': 'PlaceController.places',

  'GET /places/:id': 'ReviewController.reviews',
  'GET /places/:id/review': 'ReviewController.new',
  'POST /review': 'ReviewController.create',

  'GET /places/new': 'PlaceController.new',
  'POST /place': 'PlaceController.create',
};
