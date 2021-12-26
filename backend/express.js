const express = require('express')
var unirest = require("unirest");
const cors = require('cors');
const { ethers } = require("ethers");
require('dotenv').config()


const app = express()

const data = {};
const port = 3001
const api_key =process.env.API_KEY;
const roninAcct = '0x3aeB90BfD668cbCF68E6EfF8Fbb9cEFf94A74dB3'
app.use(cors());
app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  console.log(`api key: ${process.env.API_KEY}`)
})

async function getPlayerData(account) {

}
app.post('/submit', (req, res) => {
  if(!req.body.account || !req.body.sig){
    res.send({type: 'error', message: 'Invalid request: missing account or sig'})
    return;
  }
  if(!req.body.proposals){
    res.send({type: 'error', message: 'Invalid request: no proposals'})
    return;
  }
  let proposedAcct = ethers.utils.verifyMessage(req.body.proposals, req.body.sig);
  if(proposedAcct !== req.body.account){
    res.send({type: 'error', message: 'Invalid digital signature'})
    return;
  }
  const proposals = JSON.parse(req.body.proposals);
  let acctData = {
    number : req.body.account,
  }

  // const request = unirest("GET", `https://axie-infinity.p.rapidapi.com/get-update/${req.body.account}`);
  // request.query({"id": req.body.account});

  const request = unirest("GET", `https://axie-infinity.p.rapidapi.com/get-update/${roninAcct}`);
  request.query({"id": roninAcct});
  
  request.headers({
    "x-rapidapi-host": "axie-infinity.p.rapidapi.com",
    "x-rapidapi-key": api_key,
    "useQueryString": true
  });  
  request.end(result => {
    result.error 
    if (result.error) {
      acctData.elo = 1200
      acctData.name = "Unknown user"
      // throw new Error(result.error) 
    } else {
      acctData.elo = result.body.leaderboard.elo
      acctData.name = result.body.leaderboard.name  
    }
    Object.keys(proposals).forEach(proposal => {
      if(!data[proposal]) data[proposal] = [];
      data[proposal].push({proposal: proposals[proposal], acct: acctData});
    })
    
    console.log(data);
    res.send({type: "success", message: `${acctData.name} (${acctData.elo}) successfully submitted proposal`})
  });
  
});

app.post('/getProposalData', (req, res) => {
  console.log(`req.body: ${JSON.stringify(req.body)}, data: ${data}`)
  const reqData = req.body.skillName;
  res.send(data[reqData]);
})