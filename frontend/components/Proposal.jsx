import { useState, useEffect } from "react";
import { Button, Form, Modal, Container } from "react-bootstrap";
import Autocomplete from "react-autocomplete";
var axios = require("axios").default;
const rawData = require("../data/balancingdata.json");

export default function Proposal({ active, cancel, save }) {
  const cards = rawData.map((item) => {
    return { id: item["Part Name"], label: item["Part Name"] };
  });
  const [card, setCard] = useState("");
  const [currCard, setCurrCard] = useState();
  const [attackVal, setAttackVal] = useState();
  const [shieldVal, setShieldVal] = useState();
  const [desc, setDesc] = useState();
  const [reason, setReason] = useState();

  function handleNameChange(value) {
    const match = rawData.find((item) => value == item["Part Name"]);
    setCurrCard(match);
    setAttackVal(match ? match.Attack : undefined);
    setShieldVal(match ? match.Shield : undefined);
    setCard(value);
  }

  function clear() {
    setCard("")
    setCurrCard(undefined)
    setAttackVal(undefined)
    setShieldVal(undefined)
    setDesc(undefined)
    setReason(undefined);
  }
  return (
    <Modal
      show={active}
      aria-labelledby="contained-modal-title-vcenter"
      style={{ display: "block", overflow: "auto" }}
    >
      <Modal.Header>
        <Modal.Title>Create Proposal</Modal.Title>
      </Modal.Header>

      <Container className="d-flex flex-column justify-content-center">
        <Form.Text id="card">Choose a Card</Form.Text>

        <Autocomplete
          items={cards}
          shouldItemRender={(item, val) =>
            item.label.toLowerCase().includes(val.toLowerCase())
          }
          getItemValue={(item) => item.label}
          renderItem={(item, highlighted) => (
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? "#eee" : "transparent"}}
            >
              {item.label}
            </div>
          )}
          value={card}
          onChange={(e) => handleNameChange(e.target.value)}
          onSelect={(value) => handleNameChange(value)}
          inputProps={{ className: "form-control" }}
          wrapperStyle={{zIndex: 10}}
          // menuStyle = {{width: "50%", padding: "0.375rem, 0.75rem",
          //   fontSize: "1rem",
          //   fontWeight: "400",
          //   lineHeight: "1.5",
          //   color: "#212529",
          //   backgroundColor: "#fff",
          //   backgroundClip: "padding-box",
          //   border: "1px solid #ced4da",
          //   borderRadius: "0.25rem",
          // }}
        />
        <br />
        <Form.Text id="attack">Change Attack</Form.Text>
        <div className="row">
          <span className="col-2 d-flex justify-content-center">
            {attackVal}
          </span>
          <div className="col-10">
            <Form.Range
              disabled={!currCard}
              value={attackVal ? attackVal : "5"}
              min={currCard ? `${currCard.Attack - 20}` : "0"}
              max={currCard ? `${currCard.Attack + 20}` : "10"}
              onChange={(e) => setAttackVal(e.target.value)}
              step={"5"}
            />
          </div>
        </div>
        <Form.Text id="shield">Change Shield</Form.Text>
        <div className="row">
          <span className="col-2 d-flex justify-content-center">
            {shieldVal}
          </span>
          <div className="col-10">
            <Form.Range
              disabled={!currCard}
              value={shieldVal ? shieldVal : "5"}
              min={currCard ? `${currCard.Shield - 20}` : "0"}
              max={currCard ? `${currCard.Shield + 20}` : "10"}
              onChange={(e) => setShieldVal(e.target.value)}
              step={"5"}
            />
          </div>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Describe additional changes</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            disabled={!currCard}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Why is this change necessary?</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            disabled={!currCard}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Form.Group>
      </Container>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            clear();
            cancel(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            clear();
            save({
              "Part Name": card,
              Attack: attackVal,
              Shield: shieldVal,
              Description: desc,
              Reason: reason,
            });
          }}
        >
          Save and Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}