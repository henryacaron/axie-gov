import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import Image from 'next/image'
// import {Container, Button} from 'react-bootstrap'
import {Row, Col, Container, Button, Navbar} from "react-bootstrap"
import styles from "../styles/Home.module.css";



var axios = require("axios").default;

import { injected } from "../components/wallet/Connectors"
import { useWeb3React } from "@web3-react/core";
import Table from "../components/Table";
import Form from "../components/Form";




export default function Home() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const [choice, setChoice] = useState(null);
  const [playerData, setPlayerData] = useState(null)
  const roninAcct = '0x3aeB90BfD668cbCF68E6EfF8Fbb9cEFf94A74dB3'

  const options = {
    method: 'GET',
    url: `https://axie-infinity.p.rapidapi.com/get-update/${roninAcct}`,
    params: {id: roninAcct},
    headers: {
      'x-rapidapi-host': 'axie-infinity.p.rapidapi.com',
      'x-rapidapi-key': '245f30a3a0mshcbd083c413c6b3fp19e0f3jsn5b441100590d'
    }
  };
  
  useEffect(() => {
    axios.request(options).then(function (response) {
      console.log(response.data);
      setPlayerData(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  },[]);
  
  async function connect() {
    try {
      const val = await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }
  
  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }
  
  async function sign(message) {
    try {
      const signer = library.getSigner()
      const signedMsg = await signer.signMessage(message.toString());
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <Container class= "container" style = {{justifyContent: 'center', alignItems: 'center'}}>
    {active && 
      <Container>
      <Navbar className = "d-flex justify-content-between" bg="light" fluid="lg">
        <div className = "d-flex flex-column">
          {playerData ? <span>Connected to <b>{playerData.leaderboard.name}</b></span> : "Loading..."}
          {playerData ? <span>Elo: <b>{playerData.leaderboard.elo}</b></span> : null}
        </div>
        <Button onClick={disconnect}>Disconnect</Button>
       </Navbar>
      <Form setChoice = {setChoice} choice = {choice}/>  
      <Button className = "mt-5" onClick={() => sign(choice)}>Confirm Choice and Sign</Button>  
    </Container>}
    
    {!active &&
        <Navbar className="d-flex align-items-center justify-content-center h-100">
          <Button onClick={connect} className = "mr-10">Connect to Metamask</Button>
          {/* <span>Not connected</span> */}
        </Navbar>}
    </Container>
  )
}
