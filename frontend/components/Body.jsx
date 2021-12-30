import React, { useState, useEffect } from "react";
import { Container, Modal, Tab, Button } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import Propose from "../components/Propose";
import Vote from "../components/Vote";
import { injected } from "../components/wallet/Connectors";

var axios = require("axios").default;

export default function Body({ playerData, tab, choices, setChoices }) {
  const { active, account, activate, library } = useWeb3React();
  const [data, setData] = useState();
  const [currProposals, setCurrProposals] = useState([]);

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
    setChoices({proposals: [], choices: []})
  }
  const prevVotes = [
    {
      id: 0,
      "Part Name": "Anemone",
      mmr: 2100,
      Attack: "69",
      Shield: "69",
      Description: "It would be sick",
      Reason: "Duh",
      user: "0xhank",
      votes: 50,
    },
    {
      id: 1,
      "Part Name": "Anemone",
      mmr: 2101,
      Attack: "70",
      Shield: "70",
      Description: "Idk",
      Reason: "",
      user: "Will Robinson",
      votes: 2,
    },
    {
      id: 2,
      "Part Name": "Anemone",
      mmr: 2101,
      Attack: "70",
      Shield: "70",
      Description: "Idk",
      Reason: "",
      user: "Will Robinson",
      votes: 6,
    },
  ];
  function addProposal(proposal) {
    console.log(`proposal: ${proposal}`);
    setChoices({ ...choices, proposals: [...choices.proposals, proposal] });
    console.log(`currProposals: ${currProposals}`);
  }

  function updateVote(vote) {

    setChoices({ ...choices, votes: [...choices.votes, vote] });
  }

  //   useEffect(() => {
  //     setInterval(() => {
  //         getPrevVotes();
  //     }, 5000);
  //   }, []);
  async function connect() {
    try {
      const val = await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }
  async function getPrevVotes() {
    axios
      .post("http://localhost:3001/getProposalData/")
      .then((res) => {
        if (res.type == "error") {
          alert(`Error: ${res.data}`);
        } else {
          console.log(`received data`);
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <div className="w-100 overflow-auto">
      {active ? (
        <Container >
          {tab == "Propose" ? (
            <Propose
              addProposal={addProposal}
              currProposals={choices.proposals}
              prevProposals={[]}
            />
          ) : (
            <Vote
              myVotes={choices.votes}
              updateVote={updateVote}
              proposals={prevVotes}
            />
          )}
          {
            <Button
              disabled={!playerData || !Object.keys(choices).length}
              className="mt-5"
              style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                zIndex: "3",
              }}
              onClick={() => {
                sign(choices);
              }}
            >
              Sign and Submit
            </Button>
          }
        </Container>
      ) : (
        <Modal   show={!active}
        md
        aria-labelledby="contained-modal-title-vcenter"
        className = "pd-10">
        <Modal.Header>
          Connect to Metamask to Continue
          </Modal.Header>
          <Modal.Body>
        <Container className = "d-flex justify-content-center align-items-center">
          <Button onClick={connect} className="btn btn-primary">
            {"Connect to Metamask"}
          </Button>
          </Container>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
