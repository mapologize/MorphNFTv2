const express = require("express");
const serverless = require("serverless-http");
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(""));
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({res:"API : WORK!"});
});

router.get('/metadata/:tokenid', (req, res) => {
  res.json({
    "description": "res from api",
    "external_url": "",
    "image": `asset/00${req.params.tokenid}.png`,
    "name": `test_nft #${req.params.tokenid}`,
    "attributes": [
      {
        "trait_type": "Elemental",
        "value": "Leaf"
      }
    ]
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);