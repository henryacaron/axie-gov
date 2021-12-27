import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal } from "react-bootstrap";
import Proposal from "./Proposal";
import { useWeb3React } from "@web3-react/core";
const axios = require("axios").default;
const qData = require("../data/balancingdata.json");

export default function Body({playerData}) {
  const [activePart, setActivePart] = useState(undefined);
  const [choices, setChoices] = useState({});
  const { active, library } = useWeb3React();

  const deleteEntry = (skill) => setChoices(remove(choices, skill => !skill));

  const remove = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

  const handleClose = () => setActivePart(undefined);
  const handleOpen = (part) => setActivePart(part);

  async function sign(message) {
    let msgString = JSON.stringify(message);
    const signer = library.getSigner();
    const sig = await signer.signMessage(msgString);

    axios
      .post("http://localhost:3001/submit/", {
        account: account,
        proposals: msgString,
        sig: sig,
      })
      .then((res) => {
        if (res.type == "error") {
          alert(`Error: ${res.data.message}`);
        } else alert(res.data.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function handleChoiceChange(skill, attr, change) {
    setChoices({ ...choices, [skill]: { ...choices[skill], [attr]: change } });
  }

  return (
    <Container className="row">
      {qData.map((q, idx) => (
        <Container className=" col-lg-3 col-md-4 col-sm-6 col-xs-1 mb-3">
          <Card
            role="button"
            style={{ width: "100%" }}
            onClick={() => handleOpen(q["Part Name"])}
          >
            <Card.Body>
              <Card.Title>{q["Part Name"]}</Card.Title>
              <Card.Text>
                Attack: {q.Attack} <br />
                Defense : {q.Shield}
              </Card.Text>
            </Card.Body>
          </Card>
          <Modal
            show={q["Part Name"] === activePart}
            key={idx}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            style={{ display: "block" }}
            size="xl"
          >
            <Modal.Header style={{ maxWidth: "80%" }}>
              {q["Part Name"]}
            </Modal.Header>
            <Modal.Body>
              <Proposal
                qData={q}
                playerData={playerData}
                choice={choices[q["Part Name"]]}
                setChoice={handleChoiceChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {deleteEntry(q["Part Name"])}}>
                Clear
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save and Exit
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      ))}
      {active && playerData && (
        <Button
          disabled={!playerData || !Object.keys(choices).length}
          className="mt-5"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: "3",
            width: "20%"
          }}
          onClick={() => {
            qData.proposal = choices;
            sign(choices);
          }}
        >
          Confirm and Sign ({Object.keys(choices).length}) Vote{Object.keys(choices).length !== 1 ? 's' : null}
        </Button>
      )}
    </Container>
  );
}
