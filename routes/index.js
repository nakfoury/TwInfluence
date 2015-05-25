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
    var result = { "name": query, children: [] };
    var i = 0;
    //var result = { "name": "tweets", "children": [] }; //for jia's page
    //var data_two = {name: "root", children: []};
    T.get('search/tweets', {q: query, count: 3, result_type: "popular"}, function(err, data, response) {
        if (err) {
            console.log(err);
            console.log("search/tweets");
        }
        var tweets = data.statuses;
        tweets.forEach(function(tweet) {
            result.children += { "name": tweet.user.screen_name, "image": tweet.user.profile_image_url, "tweet": tweet.text, "retweetNo": tweet.retweet_count, children: [] };
            T.get('statuses/retweeters/ids', {id: tweet.id_str, count: 3, stringify_ids: true}, function(err, data2, response) {
                if (err) {
                    console.log(err);
                    console.log("statuses/retweeters/ids");
                }
                else {
                    var RTIDs = data2.ids;
                    var dict = [];
                    RTIDs.forEach(function(RTID) {
                        T.get('users/show', {user_id: RTID}, function (err, data3, response) {
                            if(err) {
                                console.log(err);
                                console.log("users/show");
                            }
                            else {
                                dict += { "name": data3.name, "followers": data3.followers_count, "image": data3.profile_image_url};
                            }
                        });
                    });

                    dict = dict.sort(function(a,b) {
                        return a.followers - b.followers;
                    }).reverse();
                    console.log("this is the dict, reversed, hopefully:");
                    console.log(dict);
                    for (var k=0; k<5; k++) {
                        result.children[i].children += dict[k];
                    }
                }
            });
            i++;
        });


    });
    console.log(result);
    fs.writeFileSync('public/twitter_data2.json', JSON.stringify(result));
    res.redirect('/result.html');
});

module.exports = router;
