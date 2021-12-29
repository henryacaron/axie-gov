import React, { useState, useEffect } from "react";
// import '@fortawesome/fontawesome-free/css/all.min.css'; 
// import 'bootstrap-css-only/css/bootstrap.min.css'; 
// import 'mdbreact/dist/css/mdb.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";
import Body from "../components/Body"
import Header from "../components/Header";

export default function Home() {
  const [playerData, setPlayerData] = useState(undefined);

  return (
    <Container className="d-flex flex-column justify-content-center text-center">
      <Header playerData={playerData} setPlayerData={setPlayerData} />
      <br />
      <br />
      <br />
      <Body playerData = {playerData}/>
    </Container>
  );
}
