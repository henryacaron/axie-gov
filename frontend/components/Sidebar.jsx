import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Nav } from "react-bootstrap";
import { injected } from "./wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
import {GiBroadsword} from "react-icons/gi"
import {GiEdgedShield} from "react-icons/gi"

var axios = require("axios").default;

export default function Sidebar({ proposals, votes }) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light overflow-y-auto"
      style={{
        width: "250px",
        height: "calc(100vh - 53px)",
      }}
    >
      <div className="min-height-45">
        <span className="fs-5">Proposals ({proposals.length})</span>
        {proposals.map((item, idx) => {
          return (
            <div
              key={idx}
              className="flex-none border rounded border-gray-300 bg-white  p-2 m-2"
            >
                            <div className="d-flex flex-row justify-content-around">

              <strong>{item.data["Part Name"]}</strong>

              <span>
              <GiBroadsword/>  {item.data.Attack}
              </span>
              <span>
              <GiEdgedShield/> {item.data.Shield}
              </span>
              </div>
              <span>
                {item.data.Description.slice(0, 50)}
                {item.data.Description.length > 50 ? "..." : ""}
              </span>
            </div>
          );
        })}
      </div>
      <div className="">
        <span className="fs-5">Votes ({votes.length})</span>
        {votes.map((vote, idx) => {
          return (
            <div key={idx} class="flex-none border rounded border-gray-300 bg-white p-2 m-2">
              {/* {JSON.stringify(vote)} */}
              <div className="d-flex flex-row justify-content-around">
                <strong>{vote.data["Part Name"]}</strong>
                <span>
                <GiBroadsword/> {vote.data.Attack}
                </span>
                <span>
                <GiEdgedShield/> {vote.data.Shield}
                </span>
              </div>
              <span>
                {vote.data.Description.slice(0, 50)}
                {vote.data.Description.length > 50 ? "..." : ""}
              </span>
            </div>
          );
        })}
        <hr />
      </div>
    </div>
  );
}
