import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Spinner, Button, Navbar } from "react-bootstrap";
import { injected } from "./wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
// import 'styles/nav.css'
var axios = require("axios").default;

export default function Header({ playerData, setPlayerData, tab, setTab }) {
  const { account, active, activate, deactivate } = useWeb3React();

  useEffect(() => {
    if (!active) return;
    axios
      .post("http://localhost:3001/playerData/", {
        account: account,
      })
      .then((res) => {
        if (res.type == "error") {
          alert(`Error: ${res.data}`);
        } else {
          console.log(res.data.message.body)
          setPlayerData(res.data.message.body);

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [active]);

  return (
    <div
      className="fixed-top z-10 bg-gray-200 row shadow-none py-0 navbar navbar-light"
      style={{ height: "53px" }}
    >
      <div className="col-lg-3 col-md-3">
        <strong className="fs-5"> Axie Governance</strong>
      </div>
      <div className="col-lg-3 col-md-3 row h-100">
        <div
          role="button"
          className={`p-2 h-100 col-6 d-flex justify-content-center align-items-center ${
            tab == "Vote" ? "bg-white" : null
          }`}
          onClick={() => setTab("Vote")}
        >
          Vote
        </div>
        <div
          role="button"
          className={`p-2 h-100 col-6 d-flex justify-content-center align-items-center ${
            tab == "Propose" ? "bg-white" : null
          }`}
          onClick={() => setTab("Propose")}
        >
          Propose
        </div>
      </div>
      <div
        className="d-flex flex-column col-lg-6 col-md-6"
        style={{ textAlign: "right" }}
      >
        <strong className="text-right fs-6 mb-0">
          { playerData ?  playerData.leaderboard
              ? `${playerData.leaderboard.name}`
              : <h5 className = "text-danger">!</h5>
            : <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>}{" "}
        </strong>
        <span className="mt-0">
          {active && playerData ? `Elo: ${playerData.leaderboard.elo}` : ""}
        </span>
      </div>
    </div>
  );
}
