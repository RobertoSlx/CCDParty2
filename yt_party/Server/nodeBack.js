const express = require('express')
const app = express();
const port = 3006;
var cors = require('cors')

const Twit = require('twit')
const fs = require('fs');

let tweets = [];
let tweetsFetch =[];

const Apikey = 'cxLckYIvlJnCqmiSvb0MUw8xr'
const ApiSecretKey = '54xRPs4fOLW5726kYKKcmU2fl1ypXEJb5BlZWWC3fR5T3Fx6O9'
const AccessToken = '1373515026867359744-QVvFt3b5QxhSjf0IdRp0Ej0cxBEzoI'
const AccessTokenSecret = 'fbxPuUTbw4O5ZcRyZCCQw68qi9TA7ThlM2xy5mQWEfsHU'
// const corsOpts = {
//   origin: '*',

//   methods: [
//     'GET',
//     'POST',
//   ],

//   allowedHeaders: [
//       'Content-Type',
//       'Access-Control-Allow-Origin: *'
//   ],
// };

//app.use(express.static('public'));
//app.use(cors({ credentials: true, origin: "http://localhost:3006" }));
//app.use(cors(corsOpts));

app.get('/', (req, res) => {
    getTwit()
        .then(data => {
            //console.log(data);
            res.setHeader('Content-Type', 'application/json');
            //res.setHeader('Access-Control-Allow-Origin', '*');
            console.log("Updated...");
            return res.send(JSON.stringify(data))
            //return res.send(data)
        })
        .catch(e => console.error(e));
    //return res.send('Jalo ???????');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

var T = new Twit({
  consumer_key:         Apikey,
  consumer_secret:      ApiSecretKey,
  access_token:         AccessToken,
  access_token_secret:  AccessTokenSecret,
});

const sharedTweet = {
    id: 1,
    userName : "userName",
    userPicURL : "userPic_URL",
    userText: "userText",
    fullUrl : "vid_Url",
    vidUrl : "vid_Id",
    flag : 0,
};
function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = "";
  }
    return ID;
}
const getUsersTweets = () => {
    return new Promise((resolve, reject) => {
        T.get('search/tweets', { q: 'SuavideosDeFiesta', count: 10, tweet_mode: 'extended' }, function (err, data, response) {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    });
};
const getTwit = async () => {
    tweets = await getUsersTweets();
    return parseTwiit(tweets);
    //return tweets;
}
async function parseTwiit(data) {
    tweetsFetch = [];
    tweets = data?.statuses;
    tweets.map((tweetAct) => {
        let newTweet = Object.create(sharedTweet);
        const media = tweetAct?.entities?.urls;
        newTweet.id = tweetAct?.id;
        newTweet.userText = tweetAct?.full_text;
        newTweet.userName = tweetAct?.user?.name;
        newTweet.userPicURL = tweetAct?.user?.profile_image_url_https;
        newTweet.flag = 0;

        for (let m in media) {
            if (media[m]?.expanded_url.includes('yout')) {
                newTweet.fullUrl = media[m]?.expanded_url;
                newTweet.vidUrl = YouTubeGetID(media[m]?.expanded_url);
            }
            else {
                newTweet.vidUrl = "";}
            }
            tweetsFetch.push(newTweet);
    });
    return verifyData(tweetsFetch);
}
async function verifyData(data) {
    let rawdata = fs.readFileSync('./Server/input.json');
    let PrevTwitts = JSON.parse(rawdata);

    data.forEach(element => {
            PrevTwitts.push(element);
    });

    var result = PrevTwitts.reduce((unique, o) => {
    if(!unique.some(obj => obj.vidUrl === o.vidUrl)) {
      unique.push(o);
    }
    return unique;
    },[]);

    let evil = JSON.stringify(result);
    //console.log(result);
    fs.writeFileSync('./Server/input.json', evil);
    return result;
}
