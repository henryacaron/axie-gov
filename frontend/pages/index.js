import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Accordion, Button } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import { injected } from "../components/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
import Table from "../components/Table";
import Proposal from "../components/Proposal";
import Header from "../components/Header";
const qData = require('../data/balancingdata.json');
const axios = require("axios").default;

export default function Home() {
  const { active, account, library } = useWeb3React();
  const [playerData, setPlayerData] = useState(undefined);
  const [choices, setChoices] = useState({});

  async function sign(message) {
    let msgString = JSON.stringify(message);
    const signer = library.getSigner();
    const sig = await signer.signMessage(msgString);

    axios
      .post("http://localhost:3001/submit/", {
        account: account,
        proposals: msgString,
        sig: sig,
      })
      .then((res) => {
        if (res.type == "error") {
          alert(`Error: ${res.data.message}`);
        } else alert(res.data.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function handleChoiceChange(skill, attr, change) {
    setChoices({ ...choices, [skill]: { ...choices[skill], [attr]: change } });
  }

  return (
    <Container className="d-flex flex-column justify-content-center text-center">
      <Header playerData={playerData} setPlayerData={setPlayerData} />
      <br />
      <h2>Axie Governance</h2>
      <h4>Propose Changes to Axie Cards</h4>

      {active ? (
        <Container className="d-flex flex-column justify-content-center">
          <Accordion className="h-100 w-80" variant="dark">
            {qData.map((q, idx) => (
              <Accordion.Item key={idx} eventKey={idx}>
                <Accordion.Header>{q["Part Name"]}</Accordion.Header>
                <Accordion.Body>
                  <Proposal
                    qData={q}
                    playerData={playerData}
                    choice={choices[q["Part Name"]]}
                    setChoice={handleChoiceChange}
                  />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          <Button
            disabled={!playerData}
            className="mt-5"
            onClick={() => {
              qData.proposal = choices;
              sign(choices);
            }}
          >
            Confirm Proposals and Sign
          </Button>
        </Container>
      ): 
      <h3>Connect to Metamask to Continue</h3>
      }
    </Container>
  );
}
