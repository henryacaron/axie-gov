import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useWeb3React } from "@web3-react/core";

import { Container } from "react-bootstrap";
import Body from "../components/Body";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const cs = {
    proposals: [
      // {
      //   "Part Name": "Anemone",
      //   Attack: 65,
      //   Shield: 65,
      //   Description: "It makes the Axie turn blue",
      //   Reason: "Because it would be more fun!",
      // }
    ],
    votes: [
      {
        id: 0,
        "Part Name": "Anemone",
        mmr: 2100,
        Attack: "69",
        Shield: "69",
        Description: "It would be sick",
        Reason: "Duh",
        user: "0xhank",
        votes: 50,
      }
    ],
  };


  const [playerData, setPlayerData] = useState(undefined);
  const { account, active, activate, deactivate } = useWeb3React();
  const [tab, setTab] = useState("Vote");
  const [choices, setChoices] = useState(cs);
  return (
    <div style ={{minHeight: "100%", position:"relative"}}>
      <Header
        playerData={playerData}
        setPlayerData={setPlayerData}
        tab={tab}
        setTab={setTab}
      />
      <div style={{ height: "53px" }}></div>
      <div className="d-flex flex-row">
        {active && (
          <Sidebar
            playerData={playerData}
            setPlayerData={setPlayerData}
            choices = {choices}
            class=""
          />
        )}
        <Body playerData={playerData} tab={tab} choices = {choices} setChoices = {setChoices}/>
      </div>
    </div>
  );
}
