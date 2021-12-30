import React, { useState, useEffect, Component } from "react";
import { Container, Button } from "react-bootstrap";
import Proposal from "./Proposal";
const axios = require("axios").default;

export default function Propose({ addProposal, currProposals, prevProposals }) {
  const [activeProposal, setActiveProposal] = useState(false);

  function handleAdd(){
      if(currProposals.length +prevProposals.length> 2){
        alert("You can only submit three total proposals")
        return;
      }
    setActiveProposal(true);
  }
  function saveAndClose(value) {
    addProposal(value);
    setActiveProposal(false);
  }

  return (
    <Container className="col">
      <p>{JSON.stringify(currProposals)}</p>
      <h5>Current Proposals</h5>
      <Button
        lg
        class="btn btn-primary btn-xl m-3"
        onClick={() => handleAdd()}
        style={{ borderRadius: "50%" }}
      >
        <i className="fa fa-plus"></i>
      </Button>
      {currProposals?.map((item, idx) => {
        return (
          <Container
            key={idx}
            className="row border border-primary rounded m-3"
          >
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
      {(currProposals?.length == 0) && <p>No current proposals</p>}
      <Proposal
        active={activeProposal}
        cancel={setActiveProposal}
        save={saveAndClose}
      />
      <hr/>
      <h5>Submitted Proposals</h5>
      {prevProposals?.map((item, idx) => {
        return (
          <Container
            key={idx}
            className="row border border-primary rounded m-3"
          >
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
      {(prevProposals?.length == 0) && <p>No submitted proposals</p>}

    </Container>
  );
}
