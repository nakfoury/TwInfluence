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
    res.send('index.html');
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
    var m = 0;
    buildJSON(query, m);
    //while(true) {
    //    if (m >=25) {
    //        console.log(m);
    //        break;
    //    }
    //}
    console.log(m);
    res.redirect('result.html');
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

var buildJSON = function(query, m) {
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
                    retweeters = [];

                    T.get('users/lookup', { user_id:RTIDs, include_entities:false }, function(err, data3, response) {
                        if (err) {
                            console.log(err);
                            console.log("at retweeter lookup (users/lookup)");
                        }
                        else {
                            data3.forEach(function (user) {
                                retweeters.push({
                                    "name": "@".concat(user.screen_name),
                                    "followerNo": user.followers_count,
                                    "image": user.profile_image_url.replace("normal", "400x400")
                                });
                                retweeters.sort(function (a, b) {
                                    return (b.followerNo - a.followerNo);
                                });
                                for (var n = 0; (n < retweeters.length) && (n < 5); n++) {
                                    result.children[k].children[n] = retweeters[n];
                                }
                            });
                            j++;
                            m++;
                            jf.writeFileSync("public/twitter_data.json", result);
                        }
                    });

                    //RTIDs.forEach(function (RTID) {
                    //    T.get('users/show', {user_id: RTID}, function (err, data3, response) {
                    //        if (err) {
                    //            console.log(err);
                    //            console.log("at retweeter lookup (users/show");
                    //        }
                    //        else {
                    //            retweeters[l].push({ "name":"@".concat(data3.screen_name), "followerNo":data3.followers_count, "image":data3.profile_image_url.replace("normal","400x400") });
                    //            //result.children[k].children[j].name = "@".concat(data3.screen_name);
                    //            //result.children[k].children[j].followerNo = data3.followers_count;
                    //            //result.children[k].children[j].image = data3.profile_image_url.replace("normal","400x400");
                    //            sortTopRetweeters(k, l)
                    //        }
                    //        jf.writeFileSync("public/twitter_data.json", result);
                    //        j++;
                    //        m++;
                    //    });
                    //});
                }
                i++;
            });
            l++;
        });
        //console.log(result);
        //jf.writeFileSync("public/twitter_data2.json", result);
    });
};

var sortTopRetweeters = function(resultIndex, retweetersIndex) {
    retweeters.push({ "name":"@".concat(curRT.screen_name), "followerNo":curRT.followers_count, "image":profile_image_url.replace("normal","400x400") });
    retweeters[retweetersIndex].sort(function(a,b) {
        return (b.followerNo - a.followerNo);
    });
    for (var n=0; (n < retweeters[retweetersIndex].length) && n < 5; n++) {
        result.children[resultIndex].children[n] = retweeters[retweetersIndex][n];
    }
};

module.exports = router;
