import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Nav } from "react-bootstrap";
import { injected } from "../components/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
var axios = require("axios").default;

export default function Sidebar({ playerData, setPlayerData, choices }) {
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
      class="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{
        height: "100%",
      }}
    >
      {/* <div class="d-flex flex-column align-items-left mb-3 mb-md-0 me-md-auto text-left text-decoration-none">
        <span class="fs-4">Axie Governance</span>
        <span class="fs-5">Propose Changes</span>
      </div> */}
      {/* <hr style = {{margin:  "0.25rem 0"}}/> */}
        <div>
          <span class="fs-5">Proposals ({choices.proposals.length})</span>
          {choices.proposals.map((item, idx) => {
            return (
              <Container key={idx}>
                <div className = "d-flex flex-row justify-content-around">
                <strong>{item["Part Name"]}</strong>

                <span><i className = "fa fa-sword"/> {item.Attack}</span>
                <span><i className = "fa fa-shield"/> {item.Shield}</span>
                </div>
                <span>{item.Description.slice(0,30)}{item.Description.length > 20 ? "..." : ""}</span>
              </Container>
            );
          })}
          <hr style = {{margin:  "0.25rem 0"}}/>
          <span class="fs-5">Votes ( {choices.votes.length})</span>
          {choices.votes.map((item, idx) => {
            return (
              <Container key={idx}>
                <div className = "d-flex flex-row justify-content-around">
                <strong>{item["Part Name"]}</strong>
                <span><i className = "fa fa-sword"/> {item.Attack}</span>
                <span><i className = "fa fa-shield"/> {item.Shield}</span>
                </div>
                <span>{item.Description.slice(0,30)}{item.Description.length > 20 ? "..." : ""}</span>
              </Container>
            );
          })}
          <hr />
        </div>
      
    </div>
  );
}
