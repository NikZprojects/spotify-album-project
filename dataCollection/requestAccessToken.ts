import * as dotenv from "dotenv";
const myEnv = dotenv.config({ path: "../.env" });
import axios from "axios";

const process_env = myEnv.parsed;

const SPOTIFY_CLIENT_ID = process_env?.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process_env?.SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
  const authOptions = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
          "base64"
        ),
    },
    data: "grant_type=client_credentials",
    json: true,
  };

  try {
    const response = await axios(authOptions);
    console.log(response.data);
    return response.data.access_token;
  } catch (error) {
    console.error(error);
  }
}

getAccessToken();
// This function now reurns an access token that is valid for 1 hour
// I can use this token until it expires, when it does, i can run this function again

//TODO: Next time, use this access token and combine it with return single artist
