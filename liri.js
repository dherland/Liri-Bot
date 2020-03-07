require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
function concertThis(artist){

    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(url)
        .then(function(res){
            console.log(res);
            
        })
}
