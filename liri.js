require("dotenv").config();

var tomatoesRating;
var internetRating;

var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');

var client = new Twitter(keys.twitter);

var spotify = new Spotify(keys.spotify);

var input = process.argv;

var command = input[2];

var name = "";
for (i = 3; i < input.length; i++) {
	name = name + " " + input[i];
}

name = name.trim().replace(" ", "+");

 if (command === "spotify-this-song") {
	if (name === "") {
  		name = "The Sign"
  	}
	spotify.search({ type: 'track', query: name, limit: 6 }, function(err, data) {
 	if (err) {
    	return console.log('Error occurred: ' + err);
  	}
  	
  	var track = data.tracks.items[5];
    var mySong =
		"-----------------------------------------------------------------------" + "\r\n" +
		"Song Title: " + name + "\r\n" +
		"Artist: " + track.artists[0].name + "\r\n" +
		"Album: " + track.album.name + "\r\n" + 
		"Preview Link: " + track.preview_url + "\r\n" +
		"-----------------------------------------------------------------------" + "\r\n"
		console.log(mySong);
		writeToLog(mySong);
	})

}

else if (command === "movie-this") {
 	if (name === "") {
 		name = "Mr. Nobody";
 	}

	var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";


	request.get(queryUrl, function(error, response, body) {
		
	  	if (!error && response.statusCode === 200) {
	  		for (i = 0; i < JSON.parse(body).Ratings.length; i++) {
	  			if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
	  				tomatoesRating = JSON.parse(body).Ratings[i].Value;
	  			}
	  			if (JSON.parse(body).Ratings[i].Source === "Internet Movie Database") {
	  				internetRating = JSON.parse(body).Ratings[i].Value;
	  			}
	  		}
	  		var myMovie =
  			"-----------------------------------------------------------------------" + "\r\n" +
    		"Movie Title: " + JSON.parse(body).Title + "\r\n" +
    		"Year movie released: " + JSON.parse(body).Year + "\r\n" +
    		"Movie rating: " + JSON.parse(body).Rated + "\r\n" + 
    		"Rotten Tomatoes Rating: " + tomatoesRating + "\r\n" +
    		"Internet Movie Database Rating: " + internetRating + "\r\n" +
    		"Country: " + JSON.parse(body).Country + "\r\n" + 
    		"Language: " + JSON.parse(body).Language + "\r\n" + 
    		"Movie Plot: " + JSON.parse(body).Plot + "\r\n" +
    		 "-----------------------------------------------------------------------" + "\r\n"
    		console.log(myMovie);
    		writeToLog(myMovie);

  		}
	});

}

if (command === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
			return console.log(error);
		}
		var nameArr = data.split(",");

		name = nameArr[1]

		spotify.search({ type: 'track', query: name, limit: 1 }, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			
			var track = data.tracks.items[0];
			var randomSong =
				"-----------------------------------------------------------------------" + "\r\n" +
				"Song Title: " + name + "\r\n" +
				"Artist: " + track.artists[0].name + "\r\n" +
				"Album: " + track.album.name + "\r\n" + 
				"Preview Link: " + track.preview_url + "\r\n" +
				"-----------------------------------------------------------------------" + "\r\n"
			console.log(randomSong);
			writeToLog(randomSong);
		})

	});
}



function writeToLog(printInfo) {
	fs.appendFile("log.txt", printInfo, function(err) {

		if (err) {
			return console.log(err);
		}

	});

}