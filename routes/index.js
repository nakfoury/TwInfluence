var express = require('express');
var router = express.Router();
var Twit = require('twit');

/* Put OAuth stuff here */
var T = new Twit({
    consumer_key: 'luzRJQdzj4g0L7mjTZRDpo0PO',
    consumer_secret: 'ABYUGC4a5qA5NCaV6VH5zO3Y3u9RhdGU5IeNiEHdXmz4fdWS34',
    access_token: '392365525-X2Dh0aOkfp1EQt2R9o2bX17PkW60lmxVKEyTdr22',
    access_token_secret: 'fFWofKgtDPybsipGkwFSiZWqFb0pVYE59qr6TbLiBhHFY'
    //callback: '52.24.28.184:3000/index.html'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('fubar', { title: 'Zombo.com' });
    //res.send('TwInfluence');
});

router.post('/hashtag', function(req, res) {
    console.log(req.body);
    var query = req.body['querytext'];
    var result = {};
    T.get('search/tweets', {q: query, count: 5, result_type: "popular"}, function(err, data, response) {
        console.log(data);
        result = data;
        res.json(result);
    });
});

module.exports = router;
