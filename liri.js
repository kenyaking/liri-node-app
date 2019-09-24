require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var axios = require("axios")
var moment = require("moment")
var fs = require("fs")
var spotify = new Spotify(keys.spotify);

var action = process.argv[2]
var value = process.argv[3]
switch(action){
    case "concert-this":
        ConcertThis(value)
        break;
    case "spotify-this-song":
        SpotifyThisSong(value)
        break;
    case "movie-this":
        MovieThis(value)
        break;
    case "do-what-it-says":
        DoWhatItSays()
        break;
}

function ConcertThis(artists){
    var URL = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp"
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

function SpotifyThisSong(song){
  if(song == undefined){
song = "The Sign Ace of Base"    
  }  
var params = {type:"track", query:song, limit:1}
spotify.search(params,function(error,response){
    if (error)return console.log(error)
    console.log("Artist: " + response.tracks.items[0].artists[0].name)
    console.log("Song Name: " + response.tracks.items[0].name)
    console.log("Preview URL: " + response.tracks.items[0].preview_url)
    console.log("Album Name: " + response.tracks.items[0].album.name)

})

}
function MovieThis(Title){
    if(Title == undefined){
  Title = "Mr. Nobody"    
    } 
var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + Title + "&type=movie&plot=full"
axios.get(URL).then(function(response){
        var data = response.data 
        console.log("Title: " + data.Title)
        console.log("Year: " + data.Year)
        console.log("imdbRating: " + data.imdbRating)
        console.log("Rating: " + data.Ratings[1].Value)
        console.log("Country: " + data.Country)
        console.log("Language: " + data.Language)
        console.log("Plot: " + data.Plot)
        console.log("Actors: " + data.Actors)

    })  
}  
function DoWhatItSays(){
    fs.readFile("random.txt", "UTF8", function(error, data){
        var text = data.split(",")

        switch(text[0]){
            case "concert-this":
                ConcertThis(text[1])
                break;
            case "spotify-this-song":
                SpotifyThisSong(text[1])
                break;
            case "movie-this":
                MovieThis(text[1])
                break;
    }
    })
    }