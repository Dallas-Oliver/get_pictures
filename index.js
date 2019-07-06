const Twit = require("twit");
const config = require("./config");
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const T = new Twit(config);

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.get("/request-word", async (req, res) => {
  const MW_API_KEY = "7198bafe-4e1d-43b0-92d8-163a1647cb08";
  const MW_url = `https://dictionaryapi.com/api/v3/references/collegiate/json/ball?key=${MW_API_KEY}`;
  const MW_response = await fetch(MW_url);
  const MW_data = await MW_response.json();

  const harvard_API_KEY = "4fe06830-9f8e-11e9-b676-a9025310cf9a";
  const harvard_url = `https://api.harvardartmuseums.org/image?apikey=${harvard_API_KEY}`;
  const harvard_response = await fetch(harvard_url);
  const harvard_data = await harvard_response.json();

  const data = {
    word: MW_data,
    image: harvard_data
  };

  res.json(data);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
