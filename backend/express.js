const express = require('express')
var unirest = require("unirest");
const cors = require('cors');
const { ethers } = require("ethers");
require('dotenv').config()


const app = express()

const data = [];
const port = 3001
const api_key = ""
const roninAcct = '0x3aeB90BfD668cbCF68E6EfF8Fbb9cEFf94A74dB3'
app.use(cors());
app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  console.log(`api key: ${process.env.EXPRESS_API_KEY}`)
})

async function getPlayerData(account) {

}
app.post('/submit', (req, res) => {
  if(!req.body.account || !req.body.msg || !req.body.sig){
    res.send({type: 'error', message: 'Invalid request: missing data'})
    return;
  }
  let proposedAcct = ethers.utils.verifyMessage(req.body.msg, req.body.sig);
  if(proposedAcct !== req.body.account){
    res.send({type: 'error', message: 'Invalid digital signature'})
    return;
  }
  const msg = JSON.parse(req.body.msg);
  // if(!msg.skillName || !msg.class || !msg.affect || msg.proposal == undefined){
  //   res.send({type: 'error', message: 'Invalid request: missing data'})
  //   return;
  // }
  let proposals = {
    account : req.body.account, 
  }
  for(key of Object.keys(msg)){
    proposals[key] = msg[key];
  }
  console.log(proposals);
  // const request = unirest("GET", `https://axie-infinity.p.rapidapi.com/get-update/${req.body.account}`);
    // request.query({"id": req.body.account});

  const request = unirest("GET", `https://axie-infinity.p.rapidapi.com/get-update/${roninAcct}`);
  request.query({"id": roninAcct});
  
  request.headers({
    "x-rapidapi-host": "axie-infinity.p.rapidapi.com",
    "x-rapidapi-key": process.env.EXPRESS_API_KEY,
    "useQueryString": true
  });  
  request.end(result => {
    if (result.error) {
      proposals.elo = 1200
      proposals.name = "Unknown user"
      // throw new Error(result.error) 
    }
    if (!result.error) {
      proposals.elo = result.body.leaderboard.elo
      proposals.name = result.body.leaderboard.name  
    }
    data.push(proposals);
    console.log(data);
    res.send({type: "success", message: `${proposals.name} (${proposals.elo}) successfully submitted proposal`})
  });
  
});

app.post('/getProposalData', (req, res) => {
  console.log(`req.body: ${JSON.stringify(req.body)}, data: ${data}`)
  const reqData = req.body;
  filteredData = data.filter(item => item.proposal == reqData.skill);
  res.send(data);
})