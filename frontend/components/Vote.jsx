import React, { useState, useEffect } from "react";
import { Table as T } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";

export default function Vote({ choices, setChoices }) {
  

  return (
    <Container>
      <h5>
        Vote or something
      </h5>
    </Container>
  );
}

// const [headers, setHeaders] = useState(undefined);
//   const [rows, setRows] = useState(undefined);
//   const [consensusAttack, setConsensusAttack] = useState(undefined);
//   const [consensusShield, setConsensusShield] = useState(undefined);

//   function organizeData(data) {
//     if (!data) return;
//     let columns = [
//       { title: "Name", field: "name" },
//       { title: "Elo", field: "elo" },
//       { title: "Attack", field: "attack" },
//       { title: "Shield", field: "shield" },
//     ];

//     let rowData = [];
//     let totalElo = 0;
//     let weightedShield = 0;
//     let weightedAttack = 0;
//     data.forEach((item) => {
//       console.log(`item: ${JSON.stringify(item)}`);
//       rowData.push({
//         name: item.acct.name,
//         elo: item.acct.elo,
//         attack: item.proposal.Attack,
//         shield: item.proposal.Shield,
//       });
//       weightedShield += item.proposal.Shield * item.acct.elo;
//       totalElo += item.acct.elo;
//       weightedAttack += item.proposal.Attack * item.acct.elo;
//     });
//     console.log(
//       `weightedShield: ${weightedShield}`,
//       `weightedAttack: ${weightedAttack}`,
//       `totalElo: ${totalElo}`
//     );

//     setHeaders(columns);
//     setRows(rowData);
//     setConsensusAttack(weightedAttack / totalElo);
//     setConsensusShield(weightedShield / totalElo);
//   }
