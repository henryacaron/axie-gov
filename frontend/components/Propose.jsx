import React, { useState, useEffect, Component } from "react";
import { Container, Button } from "react-bootstrap";
import Proposal from "./Proposal";
const axios = require("axios").default;

export default function Propose({
  addProposal,
  currProposals,
  prevProposals
}) {
  const [activeProposal, setActiveProposal] = useState(false);
  function saveAndClose(value) {
    addProposal(value);
    setActiveProposal(false);
  }

  return (
    <Container className="col">
      <Button onClick = {() => setActiveProposal(true)} >Make New Proposal</Button>
      {currProposals?.map((item, idx) => {
        return (
          <Container key={idx} className="row border border-primary rounded m-3">
            <span className="col-1">{item["Part Name"]}</span>
            <span className="col-2">Attack : {item.Attack}</span>
            <span className="col-2">Defense : {item.Attack}</span>
            {item.Description?.length && (
              <span className="col-3">Description : {item.Description}</span>
            )}
            {item.Reason?.length && (
              <span className="col-4">Reason : {item.Reason}</span>
            )}
          </Container>
        );
      })}
      <Proposal active = {activeProposal} cancel = {setActiveProposal} save = {saveAndClose}/>
    </Container>
  );
}
