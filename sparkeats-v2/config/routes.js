module.exports.routes = {
  "GET /": { view: 'pages/homepage' },
  "GET /reviews": "ReviewsController.reviews",
  "GET /review": "ReviewsController.new",
  "POST /review": "ReviewsController.create",
};
