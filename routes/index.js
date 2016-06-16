var express = require('express');
var router = express.Router();
var key = require('../config/config.json');
var bing = require('node-bing-api')(key);

console.log(key);


router.get('/api/imagesearch/:image/', function(req, res, next) {
  var results = [];
  var image = req.params.image;
  var isValidNum = Number(req.params.num) == req.params.num;
  var num = (isValidNum && req.params.num) || 10;

  console.log(num);
  // console.log(isValidNum);
  console.log(image);
  var promise = new Promise(
    function (resolve, reject) {
      bing.images(image, {
        top: 10,
        skip: num
      }, function(error, res, body){
        // console.log(body.d.results);
        body.d.results.map(function (item) {
          results.push({
            url : item.MediaUrl,
            snippet : item.Title,
            thumbnail : item.Thumbnail.MediaUrl,
            context : item.SourceUrl
          });
        });
        resolve(results);
      });
    }
  );

  promise.then(function (val) {
    console.log("done");
    console.log(val[0]);
    return res.json(val
      // {
      // url: val[1].url,
      // snippet : val[1].snippet,
      // thumbnail : val[1].thumbnail,
      // context : val[1].context}
    );
  });

});
/* GET home page. */
router.get('/*', function(req, res, next) {
  res.json({
    message : 'invalid url'
  });
});

module.exports = router;
