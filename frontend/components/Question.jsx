import { useState } from "react";
import ReactDOM from 'react-dom';
import {Container, Button} from "react-bootstrap"
import { injected } from "../components/wallet/Connectors"
import { useWeb3React } from "@web3-react/core";
var axios = require("axios").default;


export default function Question({qData, choice, setChoice}) {
  const choices = [-20, -15, -10, -5, 0, 5, 10, 15, 20]
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  return (
    <form className = "d-flex flex-column bg-white width-100 justify-content-center align-items-center">
    <h5>How should {qData.skillName} affect Attack? (Currently {qData.Attack})</h5>
      <Container className = "d-flex flex-column">
        <Container className = "d-flex flex-row justify-content-between">
        {choices.map((item) => (
          <Button 
            key= {item} 
            className = {choice ? choice["Attack"] == item ? "bg-btn btn-primary" : "btn btn-light": "btn btn-light"} 
            onClick={(e) => setChoice(qData.skillName, "Attack", item)}>
            {item > 0 ?'+' : null}{item}
          </Button>
        ))}
        </Container>
      </Container>
      <hr/>
      <h5>How should {qData.skillName} affect Shield? (Currently {qData.Shield})</h5>
      <Container className = "d-flex flex-column">
        <Container className = "d-flex flex-row justify-content-between">
        {choices.map((item) => (
          <Button 
            key= {item} 
            className = {choice ? choice["Shield"] == item ? "bg-btn btn-primary" : "btn btn-light": "btn btn-light"} 
            onClick={(e) => setChoice(qData.skillName, "Shield", item)}>
            {item > 0 ?'+' : null}{item}
          </Button>
        ))}
        </Container>
      </Container>
  </form>
  )
}