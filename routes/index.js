var express = require('express');
var router = express.Router();
var Twit = require('twit');
var fs = require('fs');

/* Put OAuth stuff here */
var T = new Twit({
    consumer_key: 'luzRJQdzj4g0L7mjTZRDpo0PO',
    consumer_secret: 'ABYUGC4a5qA5NCaV6VH5zO3Y3u9RhdGU5IeNiEHdXmz4fdWS34',
    access_token: '392365525-X2Dh0aOkfp1EQt2R9o2bX17PkW60lmxVKEyTdr22',
    access_token_secret: 'fFWofKgtDPybsipGkwFSiZWqFb0pVYE59qr6TbLiBhHFY'
    //callback: '52.24.28.184:3000/index.html'
});

///* GET home page. */
//router.get('/', function(req, res, next) {
//    //res.render('fubar', { title: 'Zombo.com' });
//    //res.send('TwInfluence');
//});

router.post('/result', function(req, res) {
    console.log(req.body);
    var query = req.body['querytext'];
    //var result = { "name": "tweets", "children": [] }; //for jia's page
    var data_two = {name: "root", children: []};
    T.get('search/tweets', {q: query, count: 5, result_type: "popular"}, function(err, data, response) {
        var tweets = data.statuses;

        for (var i = 0; i < tweets.length; i++) {
            //result[i] = {"id": tweets[i].id, "text": tweets[i].text, "retweets": tweets[i].retweet_count, "name": tweets[i].user.name, "handle": tweets[i].user.screen_name, "image": tweets[i].user.profile_image_url, "retweeters": []};
            data_two.children[i] = { name: tweets[i].user.name, size: tweets[i].retweet_count/*, image: tweets[i].user.profile_image*/, children: []};
            T.get('statuses/retweeters/ids', {id: tweets[i].id, stringify_ids: true}, function(err, data, response) {
                var RTIDs = data.ids;
                var dict = {};

                for (var j = 1; j < 5; j++) {
                    //result.children[i].children[j] = { "name": RTIDs[j], "size": tweets[i].retweet_count/j };//for jia's page
                    T.get('users/show', {user_id: RTIDs[j]}, function(err, data, response) {
                        //dict[data.name] = data.follower_count; for sorting more
                        data_two.children[i].children[j] = {name: data.name, follower_count: data.follower_count};
                    });
                }
            });
        }

        //console.log(result);
        fs.writeFile('public/twitter_data2.json', JSON.stringify(data_two));
    });
    res.redirect('/result.html');
});

module.exports = router;
