const Twit = require("twit");
const config = require("./config");
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const base64url = require("base64url");
global.fetch = fetch;
const T = new Twit(config.twit);

const Unsplash = require("unsplash-js").default;
const unsplash = new Unsplash(config.unsplash);

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.get("/request-word/:word", async (req, res) => {
  // console.log(req.params);
  // const MW_API_KEY = "7198bafe-4e1d-43b0-92d8-163a1647cb08";
  // const MW_url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${
  //   req.params.word
  // }?key=${MW_API_KEY}`;
  // const MW_response = await fetch(MW_url);
  // const MW_data = await MW_response.json();

  // const data = {
  //   word: MW_data
  // };

  // res.json(data);

  const photo_response = await unsplash.search.photos(req.params.word, 1, 1);
  const photos = await photo_response.json();
  const url = photos.results[0].urls.small;
  console.log(url);

  const url_data = await fetch(url);

  const img = await url_data.blob();

  res.contentType("image/jpeg");
  res.send(img);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
