import React, { useState, useEffect } from "react";
import { Container, Modal, Tab, Button } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import Propose from "./Propose";
import Vote from "./Vote";
import { injected } from "./wallet/Connectors";
import Sidebar from "../components/Sidebar";

var axios = require("axios").default;

export default function Body({ playerData, tab, choices, setChoices }) {
  const { active, account, activate, library } = useWeb3React();
  const [data, setData] = useState({ proposals: [], votes: [] });

  async function sign() {
    let msgString = JSON.stringify({proposals : choices.proposals.map(proposal => proposal.data), votes: choices.votes.map(item => item.id)})
    const signer = library.getSigner();
    const sig = await signer.signMessage(msgString);

    axios
      .post("http://localhost:3001/submit/", {
        account: account,
        data: msgString,
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
    setChoices({ proposals: [], votes: [] });
  }

  function editProposals(proposal) {
    const existingProp = choices.votes.some((aProposal) => proposal.id == aProposal.id);
    console.log(`proposal: ${proposal}`);
    setChoices({
      ...choices,
      proposals: existingProp
        ? choices.proposals.filter(aProposal => proposal.id !== aProposal.id)
        : [...choices.votes, proposal],
    });
    setChoices({ ...choices, proposals: [...choices.proposals, proposal] });
  }

  function editVotes(vote) {
    const existingVote = choices.votes.some((aVote) => vote.id == aVote.id);
    console.log(JSON.stringify(choices))
    setChoices({
      ...choices,
      votes: existingVote
        ? choices.votes.filter(aVote => aVote.id !== vote.id)
        : [...choices.votes, vote],
    });
    console.log(vote)
  }

  useEffect(() => {
    getPrevVotes();
    const intervalId = setInterval(() => {
        getPrevVotes();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);
  async function connect() {
    try {
      const val = await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }
  async function getPrevVotes() {
    axios
      .get("http://localhost:3001/fetchData/")
      .then((res) => {
        if (res.type == "error") {
          alert(`Error: ${res.data}`);
        } else {
          console.log(`got data`);
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <div className="d-flex flex-row" style = {{height: "calc(100vh - 53px)"}}>
      <Sidebar
        proposals={choices.proposals.concat(data.proposals.filter(
          (proposal) => proposal.acct.number == account
        ))}
        votes={choices.votes}
      />
      {/* <div style = {{width: "250px"}}></div> */}
        {active ? (
          <div className="w-100 overflow-y-scroll" style = {{height: "calc(100vh - 53px)"}}>
            {tab == "Propose" ? (
              <Propose
                addProposal={editProposals}
                currProposals={choices.proposals}
                prevProposals={data.proposals.filter(
                  (proposal) => proposal.acct.number == account
                )}
              />
            ) : (
              <Vote
                myVotes={choices.votes}
                editVote={editVotes}
                proposals={data.proposals}
                allVotes={data.votes}
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
                  sign();
                }}
              >
                Sign and Submit
              </Button>
            }
                      </div>

        ) : (
          <Modal
            show={!active}
            md
            aria-labelledby="contained-modal-title-vcenter"
            className="pd-10"
          >
            <Modal.Header>Connect to Metamask to Continue</Modal.Header>
            <Modal.Body>
              <Container className="d-flex justify-content-center align-items-center">
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
