var express = require('express');
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var request = require('request');
var app = express();
var url = require('url');


var clientId, redirectUri, clientSecret, redirectUri;

clientId = '64fe4035a90d4014ab03bfd83ceadb7e';
clientSecret = '5cb0a82ad4e748b4a882e57235ec3651';
/*


Step 1 = send
// https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code&scope=public_content


Step 2 = receive
// http://your-redirect-uri?code=CODE

Step 3 = send

client_id: your client id
client_secret: your client secret
grant_type: authorization_code is currently the only supported value
redirect_uri: the redirect_uri you used in the authorization request. Note: this has to be the same value as in the authorization request.
code: the exact code you received during the authorization step.

    curl -F 'client_id=CLIENT_ID' \
    -F 'client_secret=CLIENT_SECRET' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=AUTHORIZATION_REDIRECT_URI' \
    -F 'code=CODE' \
    https://api.instagram.com/oauth/access_token

Response:
{
    "access_token": "fb2e77d.47a0479900504cb3ab4a1f626d174d2d",
    "user": {
        "id": "1574083",
        "username": "snoopdogg",
        "full_name": "Snoop Dogg",
        "profile_picture": "..."
    }
}
*/



app.use(function(req, res, next){
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(express.static("./public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.listen(process.env.PORT || 3000);
app.get("/oauthredirect", function(req, res){
        
        console.log(req);


        // get the CODE from the request

        // use the code to make a request for the token

/*
    curl -F 'client_id=CLIENT_ID' \
    -F 'client_secret=CLIENT_SECRET' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=AUTHORIZATION_REDIRECT_URI' \
    -F 'code=CODE' \
    https://api.instagram.com/oauth/access_token

Response:
{
    "access_token": "fb2e77d.47a0479900504cb3ab4a1f626d174d2d",
    "user": {
        "id": "1574083",
        "username": "snoopdogg",
        "full_name": "Snoop Dogg",
        "profile_picture": "..."
    }
}
*/


        var formData = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: authorization_code,
            redirect_uri:  request.headers.host + '/oauthredirect',
            code : req.query.code
        };
        request.post({url:`https://api.instagram.com/oauth/access_token`, formData: formData}, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('Error:', err);
            }
            console.log('Ig responded with:', body);
            res.json(body);
        });
});

var port = process.env.PORT || 3000;
console.log(`Express app running on port ${port}`);

module.exports = app;