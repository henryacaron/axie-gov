import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import Propose from "../components/Propose";
import Vote from "../components/Vote";
var axios = require("axios").default;

export default function Body({ playerData }) {
    const { active, account} = useWeb3React();
    const [data, setData] = useState();
    const [choices, setChoices] = useState({})
    const [currProposals, setCurrProposals] = useState([]);

  function addProposal(proposal) {
    console.log(`proposal: ${proposal}`)
    setCurrProposals([...currProposals, proposal]);
    console.log(`currProposals: ${currProposals}`)
  }

  function newVote(vote) {
    setChoices({ ...choices, votes: { ...choices.votes, vote } });
  }

  const proposalExample = [{
      "Part Name" : "Anemone",
      Attack : 65,
      Defense : 65,
      Description : "It makes the Axie turn blue",
      Reason : "Because it would be more fun!"
  }];

//   useEffect(() => {
//     setInterval(() => {
//         getPrevVotes();
//     }, 5000);
//   }, []);

  async function getPrevVotes() {
    axios
      .post("http://localhost:3001/getProposalData/")
      .then((res) => {
        if (res.type == "error") {
          alert(`Error: ${res.data}`);
        } else {
          console.log(`received data`)
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <div>
      <Container>
        <h2>Axie Governance</h2>
        <h4>Propose Changes to Axie Cards</h4>
      </Container>
      {active ? (
        <Tabs defaultActiveKey="propose" id="tab-view">
          <Tab eventKey="propose" title="Propose">
            <Propose
              addProposal={addProposal}
              prevProposals = {proposalExample}
              currProposals = {currProposals}
            />
          </Tab>
          <Tab
            eventKey="vote"
            title="Vote"
            choices={choices}
            setChoices={newVote}
            proposals = {data?.proposals}
            prevVotes = {data?.votes[account]}
          >
            <Vote
              playerData={playerData}
              choices={choices}
              setChoices={addProposal}
            />
          </Tab>
        </Tabs>
      ) : (
        <h3>Connect to Metamask to Continue</h3>
      )}
    </div>
  );
}