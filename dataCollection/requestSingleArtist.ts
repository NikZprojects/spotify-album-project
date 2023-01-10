import * as dotenv from "dotenv";
const myEnv = dotenv.config({ path: "../.env" });
import axios from "axios";
import * as fs from "fs";

const process_env = myEnv.parsed;
const SPOTIFY_OAUTH_TOKEN = process_env?.SPOTIFY_OAUTH_TOKEN;

// Search (i.e. artist name) [https://developer.spotify.com/console/get-search-item/]
const getArtistID = async (artistName: string) => {
  //returns artist details, including artist ID: (e.g. `3Ayl7mCk0nScecqOzvNp6s`)
  const artistNameURI = encodeURI(artistName);
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${artistNameURI}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${SPOTIFY_OAUTH_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//TODO: Get albums [https://developer.spotify.com/console/get-artist-albums/]
//return album id: `0o5EAbdlKE6AJxfJrObfCU`

//TODO: Get album tracks [https://developer.spotify.com/console/get-album-tracks/]
//return track id: `3lbgZ7OEQ1PguO88gw6tCH`

//TODO: Get track info (i.e. popularity) [https://developer.spotify.com/console/tracks/](
//return popularity index: `"popularity": 34,`

const gatherData = async () => {
  const artistDetails = await getArtistID("Jimmy Eat World");
  try {
    fs.writeFileSync(
      "./artistDetailsSample.json",
      JSON.stringify(artistDetails, null, 2)
    );
  } catch (err) {
    console.log(err);
  }
};

gatherData();
