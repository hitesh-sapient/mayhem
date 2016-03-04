/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var http = require('http');
var CachemanFile = require('cacheman-file');
module.exports = {


  fetchcache: function(req, res) {

    var cache = new CachemanFile();



    var options = {
      hostname: 'product-catalog.mnsdigitallabs.net',
      port: 80,
      path: req.url,
      method: 'GET'
        //headers: {'Authorization': 'Basic ' + 'SuperSecretLoginAndPassword'}
    };

    var cachekey = req.url.split('/')[2];
    var responseData;

    cache.get(cachekey, function(error, value) {
      if (error) throw error;

      if (null == value) {
        console.log("product from api");
        http.request(options, function(response) {
          responseData = '';
          response.setEncoding('utf8');

          response.on('data', function(chunk) {
            responseData += chunk;
          });

          response.once('error', function(err) {
            // Some error handling here, e.g.:
            res.serverError(err);
          });

          response.on('end', function() {
            cache.set(cachekey, JSON.parse(responseData),
              1200,
              function(err, value) {
                if (err) throw err;
                console.log("cache product response");
                res.locals.requestData = JSON.parse(
                  responseData);
                redirectPDP(res.locals.requestData);
              });
            //res.view('product');
          });
        }).end();
      } else {
        console.log("product cache");
        //res.locals.requestData = value;
        redirectPDP(value);

      }

    });

    function redirectPDP(responseData) {
      console.log("set product response");
      res.locals.requestData = responseData;
      res.view('product');
    }

  },
  /**
   * `ProductController.fetch()`
   */
  fetch: function(req, res) {
    //http://product-catalog.mnsdigitallabs.net/products/P22190455

    var options = {
      hostname: 'product-catalog.mnsdigitallabs.net',
      port: 80,
      path: req.url,
      method: 'GET',
      //headers: {'Authorization': 'Basic ' + 'SuperSecretLoginAndPassword'}
    };

    http.request(options, function(response) {
      var responseData = '';
      response.setEncoding('utf8');

      response.on('data', function(chunk) {
        responseData += chunk;
      });

      response.once('error', function(err) {
        // Some error handling here, e.g.:
        res.serverError(err);
      });

      response.on('end', function() {
        try {
          // response available as `responseData` in `yourview`
          console.log('product');
          res.locals.requestData = JSON.parse(responseData);
          //console.log(JSON.parse(responseData));
        } catch (e) {
          sails.log.warn(
            'Could not parse response from options.hostname: ' +
            e);
        }
        res.view('product');
      });
    }).end();

  },
  /*
  Displays
  */
  display: function(req, res) {


    var options = {
      hostname: '10.211.55.5',
      port: 80,
      path: '/webapp/wcs/stores/servlet/en/marksandspencer' + req.url,
      method: 'GET',
      //headers: {'Authorization': 'Basic ' + 'SuperSecretLoginAndPassword'}
    };
    http.request(options, function(response) {
      var body = '';
      if (String(response.headers['content-type']).indexOf('text/html') !==
        -1) {
        response.on('data', function(chunk) {
          body += chunk;
        });

        response.on('end', function() {

          res.writeHead(response.statusCode, response.headers);
          res.end(body);
        });
      } else {
        response.pipe(clientResponse, {
          end: true
        });
      }
    }).end();

  },
  deletecache: function(req, res) {
    var cache = new CachemanFile();
    var cachekey = req.url.split('/')[2];
    cache.del(cachekey, function(error) {

      if (error) throw error;

      console.log('value deleted');

    });
    res.view('homepage');
  }

};
