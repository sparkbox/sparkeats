module.exports.routes = {
  'GET /': 'PlaceController.places',
  'GET /places/new': 'PlaceController.new',
  'POST /places': 'PlaceController.create',

  'GET /places/:id': 'ReviewController.reviews',
  'GET /places/:id/reviews/new': 'ReviewController.new',
  'POST /places/:id/reviews': 'ReviewController.create',
};
