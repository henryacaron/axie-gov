import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import {Navbar, Container, Button} from "react-bootstrap"
import { injected } from "../components/wallet/Connectors"
import { useWeb3React } from "@web3-react/core";
var axios = require("axios").default;

export default function PrevProposals({qData}) {
  const [prevProposals, setPrevProposals] = useState(undefined);

  useEffect(() => {
    console.log(`getting proposals`)
    getProposalData(qData.skillName)
  }, [qData])
  
  async function getProposalData(skillName) {
    axios.post('http://localhost:3001/getProposalData/', {skillName : skillName})
    .then((res) => {
      if(res.type == 'error'){
        alert(`Error: ${res.data}`)
      } else {
        console.log(res.data)
        setPrevProposals(res.data);
      }
    })
    .catch((err) => {
        console.log(err.response);
    });
  }
  return (
    <Container>
      <h3>Previous Proposals</h3>
      <Container>
      {JSON.stringify(prevProposals)}
      </Container>
   </Container>
  )
}