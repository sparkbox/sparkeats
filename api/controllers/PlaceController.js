const SkipperMySQLAdapter = require('../../skipper-mysql/SkipperMySQLAdapter');

/**
 * PlaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  new: (req, res) => res.view('pages/places/new'),
};
