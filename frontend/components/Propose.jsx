import React, { useState} from "react";
import { Container, Button, Card } from "react-bootstrap";
import Proposal from "./Proposal";
const axios = require("axios").default;

export default function Propose({ addProposal, currProposals, prevProposals }) {
  const [activeProposal, setActiveProposal] = useState(false);

  function handleAdd() {
    if (currProposals.length + prevProposals.length > 2) {
      alert("You can only submit three total proposals");
      return;
    }
    setActiveProposal(true);
  }
  function saveAndClose(value) {
    addProposal(value);
    setActiveProposal(false);
  }

  return (
    <Container className="row mt-3">
      <span class = "fs-5">Current Proposals</span>
      {currProposals.map((item, idx) => {
        return (
          <Card key={idx} className="m-2 shadow-none" style = {{minHeight: "100px"}}>
            <Card.Body>
            <div className = "fs-5">{item["Part Name"]}</div>
              <div className="mb-1 text-muted fs-6">
                Attack: {item.Attack} Shield: {item.Shield}
              </div>
              <Card.Text>{item.Description}</Card.Text>
              <Card.Text>{item.Reason}</Card.Text>

            </Card.Body>
          </Card>
        );
      })}
      <Proposal
        active={activeProposal}
        cancel={setActiveProposal}
        save={saveAndClose}
      />
      <Card
      role="button"
        className="m-2 d-flex justify-content-center align-items-center shadow-none"
        onClick={() => handleAdd()}
        style={{minHeight: "100px"}}
      >
        <i className="fa fa-plus"></i>
      </Card>
      <hr />
      <span class = "fs-5">Submitted Proposals</span>
      {prevProposals?.map((item, idx) => {
        return (
          <Card key={idx} className="m-2 shadow-none">
            <Card.Body>
              <div className = "fs-5">{item.data["Part Name"]}</div>
              <div className="mb-1 text-muted fs-6">
                Attack: {item.data.Attack} Shield: {item.data.Shield}
              </div>
              <Card.Text>{item.data.Description}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
      {prevProposals.length == 0 && <p>No submitted proposals</p>}
    </Container>
  );
}
