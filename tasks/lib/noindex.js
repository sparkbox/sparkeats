'use strict';

/**
 * auth
 *
 * Basic authentication implementation
 *
 * @param {object} req Request
 * @param {object} res Response
 * @param {function} next Callback
 *
 * Requires USER, PASS, and NODE_ENV environment variables.
 */
 
function noIndexHandler(req, res, next) {
  if (!!process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {

    res.set('X-Robots-Tag', 'noindex');

  }
  return next();
}

module.exports = noIndexHandler;
