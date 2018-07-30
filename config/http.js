/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

const methodOverride = require('method-override');

module.exports.http = {
  middleware: {
    methodOverride: methodOverride(req => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        // look in urlencoded POST bodies and delete it
        delete req.body._method;
        return method;
      }
    }),
    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'methodOverride',
      'compress',
      'poweredBy',
      'redirectHTTPS',
      'router',
      'www',
      'favicon',
    ],
    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/
    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),
    redirectHTTPS: (req, res, next) => {
      if (sails.config.environment === 'production' && !req.secure) {
        return res.redirect(`https://${req.get('host')}${req.url}`);
      }

      return next();
    },
  },
};
