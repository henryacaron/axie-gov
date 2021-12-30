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
      <h5>Current Proposals</h5>
      {currProposals.map((item, idx) => {
        return (
          <Card key={idx} className="col-lg-4 col-sm-6 m-2" style = {{minHeight: "100px"}}>
            <Card.Body>
              <Card.Title>{item["Part Name"]}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Attack: {item.Attack} Shield: {item.Shield}
              </Card.Subtitle>
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
        className="col-4 m-2 d-flex justify-content-center align-items-center"
        onClick={() => handleAdd()}
        style={{minHeight: "100px"}}
      >
        <i className="fa fa-plus"></i>
      </Card>
      <hr />
      <h5>Submitted Proposals</h5>
      {prevProposals?.map((item, idx) => {
        return (
          <Card key={idx} className="col-4 m-2">
            <Card.Body>
              <Card.Title>{item.data["Part Name"]}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Attack: {item.data.Attack} Shield: {item.data.Shield}
              </Card.Subtitle>
              <Card.Text>{item.data.Description}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
      {prevProposals.length == 0 && <p>No submitted proposals</p>}
    </Container>
  );
}
