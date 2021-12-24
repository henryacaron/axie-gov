import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Row, Col, Container, Button, Navbar} from "react-bootstrap"
import styles from "../styles/Home.module.css";
import { injected } from "../components/wallet/Connectors"
import { useWeb3React } from "@web3-react/core";
import Table from "../components/Table";
import Question from "../components/Question";
import Header from "../components/Header";
import PrevProposals from "../components/PrevProposals";

var axios = require("axios").default;

export default function Home() {
  const { active, account, library } = useWeb3React()
  const [playerData, setPlayerData] = useState(undefined)
  const qData = {skillName : "Aqua Vitality", class : "Aquatic", affect: "Shield"}

  return (
    <Container className = "d-flex flex-column justify-content-center">
      <Header playerData = {playerData} setPlayerData = {setPlayerData}/>
      <br/>
      {active && 
        <Container>
          <Question qData = {qData} playerData = {playerData}/> 
          <hr/>
          <PrevProposals qData = {qData}/>
        </Container>
      }
    </Container>
  )
}
