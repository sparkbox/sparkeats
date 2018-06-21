module.exports.routes = {
  'GET /': 'PlacesController.places',

  'GET /places/:id': 'ReviewsController.reviews',
  'GET /places/:id/review': 'ReviewsController.new',
  'POST /review': 'ReviewsController.create',

  'GET /places/new': 'PlacesController.new',
  'POST /place': 'PlacesController.create',
};
