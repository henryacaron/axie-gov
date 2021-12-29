import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import { injected } from "../components/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
var axios = require("axios").default;

export default function Header({ playerData, setPlayerData }) {
  const { account, active, activate, deactivate } =
    useWeb3React();
  const API_KEY = "0423af942bmshd3ce77619e50407p140852jsnfb3e5f3fd258";

  const options = {
    method: "GET",
    url: `https://axie-infinity.p.rapidapi.com/get-update/${account}`,
    params: { id: account },
    headers: {
      "x-rapidapi-host": "axie-infinity.p.rapidapi.com",
      "x-rapidapi-key": API_KEY,
    },
  };

  useEffect(() => {
    if(!active) return;
    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        setPlayerData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [active]);

  async function connect() {
    try {
      const val = await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <Navbar className = "d-flex justify-content-between align-items-center p-2 fixed-top" bg="light" fluid="lg">
          <div className="d-flex flex-column text-primary" style={{textAlign : "left"}}>
            <span className = "text-left">{active ? playerData ? `Connected to: ${playerData.leaderboard.name}` : "Loading..." : ""} </span>
            <span className = "text-left">{active && playerData ? `Elo: ${playerData.leaderboard.elo}` : ""}</span>
          </div>
          <Button onClick={active ? disconnect : connect} className="mr-10">{active? "Disconnect" : "Connect to Metamask"}</Button>
     
    </Navbar>
  );
}
