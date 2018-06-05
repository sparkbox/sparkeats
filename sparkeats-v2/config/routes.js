module.exports.routes = {
  "GET /": { view: 'pages/homepage' },
  
  "GET /reviews": "ReviewsController.reviews",
  "GET /reviews/:place": "ReviewsController.test",
  "GET /review": "ReviewsController.new",
  "POST /review": "ReviewsController.create",

  "GET /places": "PlacesController.places",
  "GET /place": "PlacesController.new",
  "POST /place": "PlacesController.create",
};
