var express = require('express');
var router = express.Router();
var Twit = require('twit');
var fs = require('fs');
var jf = require('jsonfile');
var result = {};
var retweeters = [];

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
    res.redirect('result.html');
});

router.post('/hashtag', function(req, res) {
    result = {
        "name": "hashtag",
        "children": [
        {
            "name": "@handle1",
            "image": "url",
            "tweet": "text",
            "retweetNo": 0,
            "children": [
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"}
            ]
        },
        {
            "name": "@handle2",
            "image": "url",
            "tweet": "text",
            "retweetNo": 0,
            "children": [
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"}
            ]
        },
        {
            "name": "@handle3",
            "image": "url",
            "tweet": "text",
            "retweetNo": 0,
            "children": [
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"}
            ]
        },
        {
            "name": "@handle4",
            "image": "url",
            "tweet": "text",
            "retweetNo": 0,
            "children": [
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"}
            ]
        },
        {
            "name": "@handle5",
            "image": "url",
            "tweet": "text",
            "retweetNo": 0,
            "children": [
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"},
                {"name": "@handle", "followerNo": 0, "image": "url"}
            ]
        }
    ]
    };
    var query = req.body['querytext'];
    var hashtag = /#/i;
    if (query.search(hashtag) != 0) {
        query = "#".concat(query);
    }
    result.name = query;
    buildJSON(query);
    setTimeout(res.redirect('result.html'), 3000);
});

router.post('/again', function(req, res) {
    result = {
        "name": "hashtag",
        "children": [
            {
                "name": "@handle1",
                "image": "url",
                "tweet": "text",
                "retweetNo": 0,
                "children": [
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"}
                ]
            },
            {
                "name": "@handle2",
                "image": "url",
                "tweet": "text",
                "retweetNo": 0,
                "children": [
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"}
                ]
            },
            {
                "name": "@handle3",
                "image": "url",
                "tweet": "text",
                "retweetNo": 0,
                "children": [
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"}
                ]
            },
            {
                "name": "@handle4",
                "image": "url",
                "tweet": "text",
                "retweetNo": 0,
                "children": [
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"}
                ]
            },
            {
                "name": "@handle5",
                "image": "url",
                "tweet": "text",
                "retweetNo": 0,
                "children": [
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"},
                    {"name": "@handle", "followerNo": 0, "image": "url"}
                ]
            }
        ]
    };
    var query = req.body['querytext'];
    var hashtag = /#/i;
    if (query.search(hashtag) != 0) {
        query = "#".concat(query);
    }
    result.name = query;
    buildJSON(query);
    setTimeout(res.redirect('result.html'), 3000);
});

var buildJSON = function(query) {
    T.get('search/tweets', {q: query, lang: 'en', count: 5, result_type: "popular"}, function (err, data, response) {
        if (err) {
            console.log(err);
            console.log("at hashtag query (search/tweets)");
        }
        var tweets = data.statuses;
        console.log(tweets);
        var i = 0;
        var l = 0;
        tweets.forEach(function (tweet) {
            result.children[l].name = "@".concat(tweet.user.screen_name);
            result.children[l].image = tweet.user.profile_image_url.replace("normal","400x400");
            result.children[l].tweet = tweet.text;
            result.children[l].retweetNo = tweet.retweet_count;
            //loadRetweeters(tweet.id_str, result, i);
            T.get('statuses/retweeters/ids', {id: tweet.id_str, count: 100, stringify_ids: true}, function(err, data2, response) {
                if (err) {
                    console.log(err);
                    console.log("at retweeter list query (statuses/retweeters/ids)");
                }
                else {
                    var RTIDs = data2.ids;
                    var dict = [];
                    var j = 0;
                    var k = i;

                    T.get('users/lookup', { user_id:RTIDs, include_entities:false }, function(err, data3, response) {
                        if (err) {
                            console.log(err);
                            console.log("at retweeter lookup (users/lookup)");
                        }
                        else {
                            retweeters = [];
                            data3.forEach(function (user) {
                                retweeters.push({
                                    "name": "@".concat(user.screen_name),
                                    "followerNo": user.followers_count,
                                    "image": user.profile_image_url.replace("normal", "400x400")
                                });
                                retweeters.sort(function (a, b) {
                                    return (b.followerNo - a.followerNo);
                                });
                                for (var n = 0; (n < Math.floor(retweeters.length / 5)); n++) {
                                    result.children[k].children[n] = retweeters[n];
                                }
                            });
                            j++;
                            jf.writeFileSync("public/twitter_data.json", result);
                        }
                    });
                }
                i++;
            });
            l++;
        });
    });
};

module.exports = router;
