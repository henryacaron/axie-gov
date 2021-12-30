const express = require('express')
var unirest = require("unirest");
const cors = require('cors');
const { ethers } = require("ethers");
require('dotenv').config()


const app = express()

const data = {proposals: [], votes: []};
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
  if(!req.body.data){
    res.send({type: 'error', message: 'Invalid request: no proposals'})
    return;
  }
  let proposedAcct = ethers.utils.verifyMessage(req.body.data, req.body.sig);
  if(proposedAcct !== req.body.account){
    res.send({type: 'error', message: 'Invalid digital signature'})
    return;
  }
  const userData = JSON.parse(req.body.data);

  const proposals = userData.proposals;
  const votes = userData.votes;

  data.votes.filter(elem => elem.acct !== req.body.account);


  let acctData = {
    number : req.body.account,
  }

  const request = unirest("GET", `https://axie-infinity.p.rapidapi.com/get-update/${req.body.account}`);
  request.query({"id": req.body.account});

  // const request = unirest("GET", `https://axie-infinity.p.rapidapi.com/get-update/${roninAcct}`);
  // request.query({"id": roninAcct});
  
  request.headers({
    "x-rapidapi-host": "axie-infinity.p.rapidapi.com",
    "x-rapidapi-key": api_key,
    "useQueryString": true
  });  
  request.end(result => {
    result.error 
    if (result.error) {
      res.send({type : "error", message : "no user found"})
      return;
    } else {
      acctData.elo = result.body.leaderboard.elo
      acctData.name = result.body.leaderboard.name  
    }
    proposals.forEach(proposal => {
      data.proposals.push({id: data.proposals.length, data: proposal, acct: acctData});
    })
    
    votes.forEach((vote) => {
      data.votes.push({vote: vote, acct: req.body.account})
    })
    console.log(JSON.stringify(data));
    res.send({type: "success", message: `${acctData.name} (${acctData.elo}) successfully submitted proposal`})
  });
  
});

app.get('/fetchData', (req, res) => {
  // console.log(`req.body: ${JSON.stringify(req.body)}, data: ${data}`)
  // const reqData = req.body.skillName;
  res.send(data);
})