import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Navbar } from "react-bootstrap";
import { injected } from "./wallet/Connectors";
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
    <div
      className="fixed-top items-start z-10 bg-light row shadow-none py-0 navbar navbar-light"
      style={{ height: "53px"}}
    >
      <div className="col-lg-2 col-md-3">
        <strong className="fs-5"> Axie Governance</strong>
      </div>
      <div className = "col-3 row h-100">
        <div
          role="button"
          className={`p-2 h-100 col-6 d-flex justify-content-center align-items-center ${
            tab == "Vote" ? "bg-white" : null
          }`}
          onClick={() => setTab("Vote")}
        >
          Vote
        </div>
        <div role="button"
          className={`p-2 h-100 col-6 d-flex justify-content-center align-items-center ${
            tab == "Propose" ? "bg-white" : null
          }`}
          onClick={() => setTab("Propose")}
        >
          Propose
        </div>
      </div>
      <div
        className="d-flex flex-column col-lg-7 col-md-6"
        style={{ textAlign: "right" }}
      >
        <strong className="text-right fs-6 mb-0">
          {active
            ? playerData
              ? `${playerData.leaderboard.name}`
              : "Loading..."
            : ""}{" "}
        </strong>
        <span className="mt-0">
          {active && playerData ? `Elo: ${playerData.leaderboard.elo}` : ""}
        </span>
      </div>
    </div>
  );
}
