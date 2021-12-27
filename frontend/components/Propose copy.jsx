import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Proposal from "./Proposal";
import { useWeb3React } from "@web3-react/core";
const axios = require("axios").default;
const rawData = require("../data/balancingdata.json");

export default function Propose({ playerData, choices, setChoices}) {
  const [activePart, setActivePart] = useState(undefined);
  const { active, library, account } = useWeb3React();
  const [filterKey, setFilterKey] = useState("");
  const [filteredData, setFilteredData] = useState(rawData);
  const deleteEntry = (skill) => setChoices(remove(choices, (skill) => !skill));

  const filter = (e) => {
    e.preventDefault();
    const substr = e.target.value;
    setFilterKey(substr);
    console.log(`substring: ${JSON.stringify(substr)}`);
    const newData = rawData.filter((elem) =>
      elem["Part Name"].toLowerCase().includes(substr.toLowerCase())
    );
    setFilteredData(newData);
  };

  const remove = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

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
    setChoices({})
  }

  return (
    <Container>
      <InputGroup className="mb-4">
        <FormControl
          placeholder="Search for Cards"
          aria-label="Card filter"
          value={filterKey}
          onChange={filter}
        />
      </InputGroup>

      <Container className="row overflow-auto h-100">
        {filteredData?.map((q, idx) => (
          <Container key={idx} className="col-md-4 col-sm-6 col-xs-1 mb-3">
            <Card
              role="button"
              style={{ width: "100%" }}
              onClick={() => handleOpen(q["Part Name"])}
            >
              <Card.Body>
                <Card.Title>{q["Part Name"]}</Card.Title>
                <Card.Text className="row">
                  <Container className="col-lg-6">
                    <b>Original</b> <hr style={{ margin: "0.2rem 0" }} />
                    Attack: {q.Attack} <br />
                    Defense: {q.Shield}
                  </Container>
                  {choices[q["Part Name"]] && (
                    <Container className="col-lg-6">
                      <b>Proposal</b> <hr style={{ margin: "0.2rem 0" }} />
                      Attack: {choices[q["Part Name"]].Attack} <br />
                      Defense: {choices[q["Part Name"]].Shield}
                    </Container>
                  )}
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
                  choice={choices[q["Part Name"]]}
                  setChoice={setChoices}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    deleteEntry(q["Part Name"]);
                  }}
                >
                  Clear
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save and Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        ))}
        {Object.keys(filteredData) == 0 && <span>No results</span>}
        {active && playerData && (
          <Button
            disabled={!playerData || !Object.keys(choices).length}
            className="mt-5"
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              zIndex: "3",
              width: "30%",
            }}
            onClick={() => {
              sign(choices);
            }}
          >
            Confirm ({Object.keys(choices).length}) Vote
            {Object.keys(choices).length !== 1 ? "s" : null} and Sign Message
          </Button>
        )}
      </Container>
    </Container>
  );
}
