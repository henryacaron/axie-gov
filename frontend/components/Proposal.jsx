import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Question from "./Question";
import Table from "./Table";
var axios = require("axios").default;

export default function Proposal({ qData, choice, setChoice }) {
  const [headers, setHeaders] = useState(undefined);
  const [rows, setRows] = useState(undefined);
  const [consensusAttack, setConsensusAttack] = useState(undefined);
  const [consensusShield, setConsensusShield] = useState(undefined);

  useEffect(() => {
    getProposalData(qData.skillName);
  }, []);

  async function getProposalData(skillName) {
    axios
      .post("http://localhost:3001/getProposalData/", { skillName: skillName })
      .then((res) => {
        if (res.type == "error") {
          alert(`Error: ${res.data}`);
        } else {
          organizeData(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function organizeData(data) {
    if (!data) return;
    let columns = [
      { title: "Name", field: "name" },
      { title: "Elo", field: "elo" },
      { title: "Attack", field: "attack" },
      { title: "Shield", field: "shield" },
    ];

    let rowData = [];
    let totalElo = 0;
    let weightedShield = 0;
    let weightedAttack = 0;
    data.forEach((item) => {
      console.log(`item: ${JSON.stringify(item)}`);
      rowData.push({
        name: item.acct.name,
        elo: item.acct.elo,
        attack: item.proposal.Attack,
        shield: item.proposal.Shield,
      });
      weightedShield += item.proposal.Shield * item.acct.elo;
      totalElo += item.acct.elo;
      weightedAttack += item.proposal.Attack * item.acct.elo;
    });
    console.log(
      `weightedShield: ${weightedShield}`,
      `weightedAttack: ${weightedAttack}`,
      `totalElo: ${totalElo}`
    );

    setHeaders(columns);
    setRows(rowData);
    setConsensusAttack(weightedAttack / totalElo);
    setConsensusShield(weightedShield / totalElo);
  }

  return (
    <Container className="row">
      <Container className="col-lg-7">
        <h3>Cast Your Vote</h3>
        <Question
          qData={qData}
          setChoice={setChoice}
          choice={choice?.Shield}
          attr="Shield"
        />
        <hr />
        <Question
          qData={qData}
          setChoice={setChoice}
          choice={choice?.Attack}
          attr="Attack"
        />
        <hr/>
      </Container>
      <Container className = "col-lg-5">
        <h3>Voting Summary</h3>
        {rows ? (
          <Container>
            <Container className="row">
              <span className = "col-lg-4">Number of Voters: {rows.length}</span>
              <span className = "col-lg-4">
                Consensus Attack Proposal: {Math.round(consensusAttack)}
              </span>
              <span className = "col-lg-4">
                Consensus Shield Proposal: {Math.round(consensusShield)}
              </span>
              <hr />
            </Container>
            <h3>Previous Votes</h3>

            <Table headers={headers} data={rows} />
          </Container>
        ) : (
          <h5>No Previous Proposals</h5>
        )}
      </Container>
    </Container>
  );
}
