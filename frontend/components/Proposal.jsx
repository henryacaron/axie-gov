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
    getProposalData(qData["Part Name"]);
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
      <Container className="col-lg-6">
        <h3>Cast Your Vote</h3>
        <hr/>
        <Question
          qData={qData}
          setChoice={setChoice}
          choice={choice?.Attack}
          attr="Attack"
        />
  
        <hr/>
        <Question
          qData={qData}
          setChoice={setChoice}
          choice={choice?.Shield}
          attr="Shield"
        />
        <hr />
        
      </Container>
      <Container className = "col-lg-6">
        <h3>Voting Summary</h3>
        <hr/>
        {rows ? (
          <div>
            <Container className="row">
              <span className = "col-lg-4">Votes: {rows.length}</span>
              <span className = "col-lg-4">
                Attack Change: {Math.round(consensusAttack)}
              </span>
              <span className = "col-lg-4">
                Shield Change: {Math.round(consensusShield)}
              </span>
            </Container>
            <hr />

            <h3>Previous Votes</h3>

            <Table headers={headers} data={rows} style = {{height: '50%', overflowY: 'scroll'}}/>
          </div>
        ) : (
          <h5>No Previous Proposals</h5>
        )}
      </Container>
    </Container>
  );
}
