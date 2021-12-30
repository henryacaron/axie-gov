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



  const [playerData, setPlayerData] = useState(undefined);
  const { account, active, activate, deactivate } = useWeb3React();
  const [tab, setTab] = useState("Vote");
  const [choices, setChoices] = useState({proposals: [], votes: []});
  return (
    <div style ={{minHeight: "100%", position:"relative"}}>
      <Header
        playerData={playerData}
        setPlayerData={setPlayerData}
        tab={tab}
        setTab={setTab}
      />
      <div style={{ height: "53px" }}></div>

        <Body playerData={playerData} tab={tab} choices = {choices} setChoices = {setChoices}/>
    </div>
  );
}
