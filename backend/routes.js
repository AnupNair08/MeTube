const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/trending", async (req, res) => {
  console.log(req.query);
  const maxResults = req.query.max ? parseInt(req.query.max) : 20;
  const regionCode = req.query.reg ? req.query.reg : "US";
  const pageToken = req.query.pt ? "&pageToken=" + req.query.pt : "";
  let result = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResults}&regionCode=${regionCode}${pageToken}&key=[YOUR_API_KEY]`
  );
  const resultJson = await result.json();
  res.json(resultJson);
});

router.get("/search", async (req, res) => {
  console.log(req.query);
  const query = req.query.q;
  let result = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=20&key=[YOUR_API_KEY]`
  );
  const resultJson = await result.json();
  res.json(resultJson);
});

module.exports = router;
