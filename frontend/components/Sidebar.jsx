import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Nav } from "react-bootstrap";
import { injected } from "./wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
var axios = require("axios").default;

export default function Sidebar({ proposals, votes }) {

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light overflow-y-auto"
      style={{
        width: '250px',
        height: "calc(100vh - 53px)"
      }}
    >
      <div className = "h-50">
        <span className="fs-5">Proposals ({proposals.length})</span>
        {proposals.map((item, idx) => {
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
              {/* {JSON.stringify(item)} */}

                {item.Description.slice(0, 30)}
                {item.Description.length > 30 ? "..." : ""}
              </span>
            </Container>
          );
        })}
        <hr style={{ margin: "0.25rem 0" }} />
        </div>
        <div className = "h-50">
        <span className="fs-5">Votes ({votes.length})</span>
        {votes.map((vote, idx) => {
          return (
            <div key={idx} class= "flex-none border rounded border-dark p-2 m-2">
              {/* {JSON.stringify(vote)} */}
              <div className="d-flex flex-row justify-content-around">
                <strong>{vote.data["Part Name"]}</strong>
                <span>
                  <i className="fa fa-sword" /> A: {vote.data.Attack}
                </span>
                <span>
                  <i className="fa fa-shield" /> S: {vote.data.Shield}
                </span>
              </div>
              <span>
                {vote.data.Description.slice(0, 30)}
                {vote.data.Description.length > 30 ? "..." : ""}
              </span>
            </div>
          );
        })}
        <hr />
      </div>
    </div>
  );
}
