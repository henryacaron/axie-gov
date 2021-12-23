const express = require('express')
var unirest = require("unirest");
const cors = require('cors');

const app = express()

const data = [];
const port = 3001
app.use(cors());
app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/submit', (req, res) => {
  // data.push(req.params)
  console.log(req.body); 
  // res.send(data);
})

app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})