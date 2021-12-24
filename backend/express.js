const express = require('express')
var unirest = require("unirest");
const cors = require('cors');
const { ethers } = require("ethers");
require('dotenv').config()

const app = express()

const data = [];
const port = 3001
app.use(cors());
app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/submit', (req, res) => {
  let propData = req.body;
  console.log(propData)
  if(!propData.account || !propData.msg || !propData.sig){
    res.send({type: 'error', message: 'Invalid request: missing data'})
    return;
  }
  let proposedAcct = ethers.utils.verifyMessage(propData.msg, propData.sig);
  if(proposedAcct !== propData.account){
    res.send({type: 'error', message: 'Invalid digital signature'})
    return;
  }
  propData.msg = JSON.parse(propData.msg);
  if(!propData.msg.skillName || !propData.msg.class || !propData.msg.affect || propData.msg.proposal == undefined){
    res.send({type: 'error', message: 'Invalid request: missing data'})
    return;
  }
  const request = unirest("GET", `https://axie-infinity.p.rapidapi.com/get-update/${propData.account}`);
  request.query({"id": propData.account});
  request.headers({
    "x-rapidapi-host": "axie-infinity.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    "useQueryString": true
  });  
  request.end(result => {
    if (result.error) {
      propData.elo = 1200
      propData.name = "Unknown user"
      // throw new Error(result.error) 
    }
    if (!result.error) {
      propData.elo = result.body.leaderboard.elo
      propData.name = result.body.leaderboard.name  
    }
    data.push(propData);
    console.log(data);
    res.send({type: "success", message: `${!propData.name ? 'Unknown' : propData.name  } successfully proposed ${propData.msg.proposal} ${propData.msg.affect} from ${propData.msg.skillName}`})

  });
  
});

app.post('/getProposalData', (req, res) => {
  console.log(`req.body: ${JSON.stringify(req.body)}, data: ${data}`)
  const reqData = req.body;
  filteredData = data.filter(item => item.msg.proposal == reqData.skillName);
  res.send(data);
})