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
    //var result = { "name": "tweets", "children": [] }; //for jia's page
    //var data_two = {name: "root", children: []};
    T.get('search/tweets', {q: query, count: 2, result_type: "popular"}, function(err, data, response) {
        if (err) {
            console.log(err);
            console.log("search/tweets");
        }
        var tweets = data.statuses;
        tweets.forEach(function(tweet) {
            result.children += { "name": tweet.user.screen_name, "image": tweet.user.profile_image_url, "tweet": tweet.text, "retweetNo": tweet.retweet_count, children: [] };
            //result[i] = {"id": tweets[i].id_str, "text": tweets[i].text, "retweets": tweets[i].retweet_count, "name": tweets[i].user.name, "handle": tweets[i].user.screen_name, "image": tweets[i].user.profile_image_url, "retweeters": []};
            //data_two.children[i] = { name: tweets[i].user.name, size: tweets[i].retweet_count/*, image: tweets[i].user.profile_image*/, children: []};

            T.get('statuses/retweeters/ids', {id: tweet.id_str, count: 10, stringify_ids: true}, function(err, data2, response) {
                if (err) {
                    console.log(err);
                    console.log("statuses/retweeters/ids");
                }
                else {
                    var RTIDs = data2.ids;
                    var dict = [];
                    RTIDs.forEach(function(RTID) {
                        //result.children[i].children[j] = { "name": RTIDs[j], "size": tweets[i].retweet_count/j };//for jia's page
                        T.get('users/show', {user_id: RTID}, function (err, data, response) {
                            if(err) {
                                console.log(err);
                                console.log("users/show");
                            }
                            //dict[data.name] = data.follower_count; for sorting more
                            //data_two.children[i].children[j] = {name: data.name, follower_count: data.follower_count};

                            dict += { "name": data.name, "follower_count": data.follower_count, "image": data.profile_image_url}

                        });
                    });

                    function custom_cmp (a,b) {
                        return a.follower_count - b.follower_count;
                    }
                    dict.sort(custom_cmp).reverse();
                    console.log(dict);
                    //for (var k=0; k<5; k++) {
                    //    result.children.children += { "name": dict[k].name, "followerNo": dict[k].follower_count, "image": dict[k].profile_image_url};
                    //}
                }
            });
        });

        console.log(result);
        fs.writeFile('public/twitter_data2.json', JSON.stringify(result));
    });
    res.redirect('/result.html');
});

module.exports = router;
