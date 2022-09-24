const express = require("express");
const serverless = require("serverless-http");
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(""));
const app = express();
const router = express.Router();

router.get("/", (res) => {
  res.json({
    "description": "test description",
    "external_url": "",
    "image": `https://thestoics.nftmoshpit.com/images/ca382c3d531660f8fd7e487e1c46e72f0b90070e332e5fef58b9485ca7411f51.jpg`,
    "name": "test_nft #1",
    "attributes": [
      {
        "trait_type": "Background",
        "value": "Purple Nova"
      }
    ]
  });
});

router.get('/getsignature/:pkey/:hash', (req, res) => {
    const privateKey = req.params.pkey;
    const hashmes = req.params.hash;
    const sigObj = web3.eth.accounts.sign(hashmes, privateKey);
    res.send(sigObj.signature);
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