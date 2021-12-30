import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Button } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import Propose from "../components/Propose";
import Vote from "../components/Vote";
import { injected } from "../components/wallet/Connectors";

var axios = require("axios").default;

export default function Body({ playerData, tab, choices, setChoices }) {
  const { active, account, activate } = useWeb3React();
  const [data, setData] = useState();
  const [choices, setChoices] = useState({});
  const [currProposals, setCurrProposals] = useState([]);

  function addProposal(proposal) {
    console.log(`proposal: ${proposal}`);
    setCurrProposals([...currProposals, proposal]);
    console.log(`currProposals: ${currProposals}`);
  }

  function newVote(vote) {
    setChoices({ ...choices, votes: [ ...choices.votes, vote ] });
  }

  function removeVote(vote) {
    setChoices({ ...choices, votes: [ ...choices.votes, vote ] });
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
    <div>
      {active ? (
        <Container className="w-100">
          {tab == "Propose" ? (
            <Propose
              addProposal={addProposal}
              currProposals={choices.proposals}
              prevProposals={[]}

            />
          ) : (
            <Vote
              playerData={playerData}
              choices={choices.votes}
              addVote={newVote}
              removeVote = {removeVote}
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
        <div>
          <h3>Connect to Metamask to Continue</h3>
          <Button onClick={connect} className="btn btn-primary">
            {"Connect to Metamask"}
          </Button>
        </div>
      )}
    </div>
  );
}
