import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import MaterialTable from "material-table";
import Table from './Table'
var axios = require("axios").default;

export default function Question({ qData, choice, setChoice }) {
  const choices = [-20, -15, -10, -5, 0, 5, 10, 15, 20];
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
    <Container className="d-flex flex-row">
      <Container className="d-flex flex-column bg-white">
        <h5>
          How should {qData.skillName} affect Attack? (Currently {qData.Attack})
        </h5>
        <Container className="d-flex flex-column">
          <Container className="d-flex flex-row justify-content-between">
            {choices.map((item) => (
              <Button
                key={item}
                className={
                  choice
                    ? choice["Attack"] == item
                      ? "bg-btn btn-primary"
                      : "btn btn-light"
                    : "btn btn-light"
                }
                onClick={(e) => setChoice(qData.skillName, "Attack", item)}
              >
                {item > 0 ? "+" : null}
                {item}
              </Button>
            ))}
          </Container>
        </Container>
        <hr />
        <h5>
          How should {qData.skillName} affect Shield? (Currently {qData.Shield})
        </h5>
        <Container className="d-flex flex-column">
          <Container className="d-flex flex-row justify-content-between">
            {choices.map((item) => (
              <Button
                key={item}
                className={
                  choice
                    ? choice["Shield"] == item
                      ? "bg-btn btn-primary"
                      : "btn btn-light"
                    : "btn btn-light"
                }
                onClick={(e) => setChoice(qData.skillName, "Shield", item)}
              >
                {item > 0 ? "+" : null}
                {item}
              </Button>
            ))}
          </Container>
        </Container>
      </Container>

      <Container>
        {rows && (
          <div>
            <span>Number of Voters: {rows.length}</span>
            <span>AC: {consensusAttack}</span>
            <span>SC: {consensusShield}</span>
          </div>
        )}

        {rows && headers && (
          <Table
            headers={headers}
            data={rows}
          />
        )}
      </Container>
    </Container>
  );
}
