require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var axios = require("axios")
var moment = require("moment")
var spotify = new Spotify(keys.spotify);

var action = process.argv[2]
var value = process.argv[3]
switch(action){
    case "concert-this":
        ConcertThis()
        break;
    case "spotify-this-song":
        SpotifyThisSong()
        break;
    case "movie-this":
        MovieThis()
        break;
    case "do-what-it-says":
        DoWhatItSays()
        break;
}

function ConcertThis(){
    var URL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp"
    axios.get(URL).then(function(response){
        var data = response.data 
        for (var i=0; i<data.length; i++){
            console.log(data[i].venue.name)
            console.log(data[i].venue.city)
            console.log(moment(data[i].datetime).format("MM/DD/YYYY"))
            console.log()
        }
    }) 

}

function SpotifyThisSong(){
    
}
