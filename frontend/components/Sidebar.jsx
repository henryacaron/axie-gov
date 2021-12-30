import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Nav } from "react-bootstrap";
import { injected } from "../components/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
var axios = require("axios").default;

export default function Sidebar({ playerData, setPlayerData, choices }) {
  const { account, active, activate, deactivate } = useWeb3React();

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{
        minHeight: "100%",
      }}
    >
      <div>
        <span className="fs-5">Proposals ({choices.proposals.length})</span>
        {choices.proposals.map((item, idx) => {
          return (
            <Container key={idx}>
              <div className="d-flex flex-row justify-content-around">
                <strong>{item["Part Name"]}</strong>

                <span>
                  <i className="fa fa-sword" /> A: {item.Attack}
                </span>
                <span>
                  <i className="fa fa-shield" /> S: {item.Shield}
                </span>
              </div>
              <span>
              {JSON.stringify(item)}

                {/* {item.Description.slice(0, 30)}
                {item.Description.length > 30 ? "..." : ""} */}
              </span>
            </Container>
          );
        })}
        <hr style={{ margin: "0.25rem 0" }} />
        <span className="fs-5">Votes ({choices.votes.length})</span>
        {choices.votes.map((item, idx) => {
          return (
            <Container key={idx}>
              <div className="d-flex flex-row justify-content-around">
                <strong>{item["Part Name"]}</strong>
                <span>
                  <i className="fa fa-sword" /> A: {item.Attack}
                </span>
                <span>
                  <i className="fa fa-shield" /> S: {item.Shield}
                </span>
              </div>
              <span>
                {/* {item.Description.slice(0, 30)}
                {item.Description.length > 30 ? "..." : ""} */}
              </span>
            </Container>
          );
        })}
        <hr />
      </div>
    </div>
  );
}
