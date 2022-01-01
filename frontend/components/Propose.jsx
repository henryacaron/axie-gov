import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import Proposal from "./Proposal";
import {GiBroadsword} from "react-icons/gi"
import {GiEdgedShield} from "react-icons/gi"
const sha1 = require('sha-1');

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
    addProposal({id: sha1(JSON.stringify(value)), data : value});
    setActiveProposal(false);
  }

  return (
    <Container className="row mt-3">
      <span class="fs-5">Current Proposals</span>
      {currProposals.map((item, idx) => {
        return (
          <Card
            key={idx}
            className="m-2 shadow-none row"
            style={{ minHeight: "100px" }}
          >
            <Card.Body className = "row">
              <div className="col-md-4 border-right">
                <div className="fs-5">{item.data["Part Name"]}</div>
                <div className="mb-1 text-muted fs-6">
                  <GiBroadsword/>  {item.data.Attack} <GiEdgedShield/> {item.data.Shield}
                </div>
              </div>
              <div className="col-md-8">
                <Card.Text >
                  <strong>Description: </strong>
                  {item.data.Description}
                </Card.Text>
                <hr/>
                <Card.Text>
                  <strong>Reason: </strong>
                  {item.data.Reason}
                </Card.Text>
              </div>
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
        style={{ minHeight: "100px" }}
      >
        <i className="fa fa-plus"></i>
      </Card>
      <hr />
      <span class="fs-5">Submitted Proposals</span>
      {prevProposals?.map((item, idx) => {
        return (
          <Card
          key={idx}
          className="m-2 shadow-none row"
          style={{ minHeight: "100px" }}
        >
          <Card.Body className = "row">
            <div className="col-md-4 border-right">
              <div className="fs-5">{item.data["Part Name"]}</div>
              <div className="mb-1 text-muted fs-6">
              <GiBroadsword/> {item.data.Attack} <GiEdgedShield/> {item.data.Shield}
              </div>
            </div>
            <div className="col-md-8">
              <Card.Text >
                <strong>Description: </strong>
                {item.data.Description}
              </Card.Text>
              <hr/>
              <Card.Text>
                <strong>Reason: </strong>
                {item.data.Reason}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
        );
      })}
      {prevProposals.length == 0 && <p>No submitted proposals</p>}
    </Container>
  );
}
