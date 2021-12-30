import React, { useState, useEffect } from "react";
import { Table as T } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";
import { MDBDataTable, MDBInput } from "mdbreact";

export default function Vote({ data, myVotes }) {
  const [checkbox1, setCheckbox1] = useState("");

  const showLogs2 = (e) => {
    setCheckbox1(e);
  };
  const columns = [
    { label: "Vote", field: "vote", sort: "asc", width: 50 },
    { label: "Card", field: "card", sort: "asc", width: 100 },
    { label: "MMR", field: "mmr", sort: "asc", width: 100 },
    { label: "Attack", field: "attack", sort: "asc", width: 100 },
    { label: "Shield", field: "shield", sort: "asc", width: 100 },
    { label: "Description", field: "desc", sort: "asc", width: 100 },
    { label: "Reason", field: "reason", sort: "asc", width: 100 },
    { label: "Proposed By", field: "user", sort: "asc", width: 100 },
    { label: "Votes", field: "votes", sort: "asc", width: 100 },
  ];
  const info = [
    {
      vote: <input label="Check 2" type="checkbox" id="checkbox1" />,
      card: "Anemome",
      mmr: 2100,
      attack: "69",
      shield: "69",
      desc: "It would be sick",
      reason: "Duh",
      user: "0xhank",
      votes: 50,
    },
    {
      vote: <input label="Check 2" type="checkbox" id="checkbox2" />,
      card: "Anemome",
      mmr: 2101,
      attack: "70",
      shield: "70",
      desc: "Idk",
      reason: "",
      user: "Will Robinson",
      votes: 2,
    },
    {
      vote: <input label="Check 2" type="checkbox" id="checkbox3" />,
      card: "Anemome",
      mmr: 2101,
      attack: "70",
      shield: "70",
      desc: "Idk",
      reason: "",
      user: "Will Robinson",
      votes: 6,
    },
  ];

  return (
    <div>
      <MDBDataTable
    
        bordered
        hover
        data={{ columns: columns, rows: info }}
        //   checkbox
        responsive
        order={["votes", "desc"]}
        //   headCheckboxID="id2"
        //   bodyCheckboxID="checkboxes2"
        //   getValueCheckBox={(e) => {
        //     showLogs2(e);
        //   }}
      />
    </div>
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
