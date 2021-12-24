import { useState } from "react";
import ReactDOM from 'react-dom';
import {Container, Button} from "react-bootstrap"
import { injected } from "../components/wallet/Connectors"
import { useWeb3React } from "@web3-react/core";
var axios = require("axios").default;


export default function Question({qData, playerData}) {
  const choices = [-20, -15, -10, -5, 0, 5, 10, 15, 20]
  const [choice, setChoice] = useState(undefined);
  const { active, account, library, connector, activate, deactivate } = useWeb3React()


  async function sign(message) {
    let msgString = JSON.stringify(message);
    const signer = library.getSigner()
    const sig = await signer.signMessage(msgString);
    axios.post('http://localhost:3001/submit/', {account: account, msg: msgString, sig : sig})
    .then((res) => {
      if(res.type == 'error'){
        alert(`Error: ${res.data.message}`)
      } else alert(res.data.message)
    })
      .catch((err) => {
          console.log(err.response);
      });
  }

  return (
    <form className = "d-flex flex-column bg-white width-100 justify-content-center align-items-center">
    <h3>How should {qData.skillName} affect {qData.affect}?</h3>

      <Container className = "d-flex flex-column">
        <Container className = "d-flex flex-row justify-content-between">
        {choices.map((item) => (<Button key= {item} className = {choice == item ? "bg-btn btn-primary" : "btn btn-dark"} onClick={(e) => setChoice(item)}>{item > 0 ?'+' : null}{item}</Button>))
        }
        </Container>
        <Button disabled = {!(playerData && choice !== undefined)} 
                className = "mt-5" 
                onClick={() => {
                  qData.proposal = choice;
                  sign(qData);
                }}>
          Confirm Choice and Sign
        </Button>
      </Container>
  </form>
  )
}