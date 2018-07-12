module.exports.routes = {
  'GET /': 'PlaceController.places',
  'GET /places/new': 'PlaceController.add',
  'POST /places': 'PlaceController.create',

  'GET /places/:id': 'ReviewController.reviews',
  'GET /places/:id/reviews/new': 'ReviewController.add',
  'POST /places/:id/reviews': 'ReviewController.create',
};
