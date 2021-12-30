import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Navbar } from "react-bootstrap";
import { injected } from "../components/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
// import 'styles/nav.css'
var axios = require("axios").default;

export default function Header({ playerData, setPlayerData, tab, setTab }) {
  const { account, active, activate, deactivate } = useWeb3React();
  const API_KEY = "";

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
    if (!active) return;
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

  return (
    <Navbar
      className="fixed-top w-100 items-start z-10 bg-light inline-flex" style = {{height: "53px"}}
    >
      <div className = "col-8">
        <strong>Axie Governance</strong>
      </div>
      <Button onClick = {() => setTab("Propose")}>Propose</Button>
        <Button onClick = {() => setTab("Vote")}>Vote</Button>
      <div
        className="d-flex flex-column text-primary col-2"
        style={{ textAlign: "left" }}
      >
       

        <span className="text-right">
          {active
            ? playerData
              ? `Connected to: ${playerData.leaderboard.name}`
              : "Loading..."
            : ""}{" "}
        </span>
        <span className="text-left">
          {active && playerData ? `Elo: ${playerData.leaderboard.elo}` : ""}
        </span>
      </div>
    </Navbar>
  );
}
