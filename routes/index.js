var express = require('express');
var router = express.Router();

/* Put OAuth stuff here */
//blahblah

/* GET home page. */
router.get('/', function(req, res, next) {
    //
    // res.render('fubar', { title: 'Zombo.com' });
    res.send('TwInfluence');
});

router.get('nomatter', function(req, res, next) {
    var query = 'aaaaa'; //it'll come from the req
    var result = {};
    //use twitter to update result
    res.json(result);
});

module.exports = router;
