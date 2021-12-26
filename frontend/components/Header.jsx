import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import { injected } from "../components/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
var axios = require("axios").default;

export default function Header({ playerData, setPlayerData }) {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const roninAcct = "0x3aeB90BfD668cbCF68E6EfF8Fbb9cEFf94A74dB3";
  const API_KEY = "";

  const options = {
    method: "GET",
    url: `https://axie-infinity.p.rapidapi.com/get-update/${roninAcct}`,
    params: { id: roninAcct },
    headers: {
      "x-rapidapi-host": "axie-infinity.p.rapidapi.com",
      "x-rapidapi-key": API_KEY,
    },
  };

  useEffect(() => {
    // console.log(`active: ${active}`);
    // console.log(`api key: ${JSON.stringify(process.env)}`);
    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        setPlayerData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

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
    <Navbar className = "d-flex justify-content-between align-items-center p-2 text-left" bg="white" fluid="lg">
      {active ? (
        <Container
          className="d-flex justify-content-between align-items-center p-2"
          bg="dark"
          fluid="lg"
        >
          <div className="d-flex flex-column text-primary text-justify">
            {playerData ? (
              <span>
                Connected to <b>{playerData.leaderboard.name}</b>
              </span>
            ) : (
              "Loading..."
            )}
            {playerData ? (
              <span>
                Elo: <b>{playerData.leaderboard.elo}</b>
              </span>
            ) : null}
          </div>
          <Button onClick={disconnect}>Disconnect</Button>
        </Container>
      ) : (
        <Container
          className="d-flex justify-content-center align-items-center p-2"
          bg="dark"
          fluid="lg"
        >
          <Button onClick={connect} className="mr-10">
            Connect to Metamask
          </Button>
        </Container>
      )}
    </Navbar>
  );
}
