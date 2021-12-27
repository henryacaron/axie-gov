import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Card, Button, Modal } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import { injected } from "../components/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
import Body from "../components/Body";
import Header from "../components/Header";

export default function Home() {
  const { active, account, library } = useWeb3React();
  const [playerData, setPlayerData] = useState(undefined);

  return (
    <Container className="d-flex flex-column justify-content-center text-center">
      <Header playerData={playerData} setPlayerData={setPlayerData} />
      <br />
      <br />
      <br />

      <Container>
        <h2>Axie Governance</h2>
        <h4>Propose Changes to Axie Cards</h4>
      </Container>
      {active ? (
        <Container>
          <Body playerData = {playerData}/>
        </Container>
      ) : (
        <h3>Connect to Metamask to Continue</h3>
      )}
    </Container>
  );
}
