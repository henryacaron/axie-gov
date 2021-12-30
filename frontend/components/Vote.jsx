import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { MDBDataTableV5, MDBInput } from "mdbreact";

export default function Vote({ myVotes, proposals, updateVote }) {
  const columns = [
    { label: "Vote", field: "Part Name", sort: "asc", width: 100 },

    { label: "Card", field: "Part Name", sort: "asc", width: 100 },
    { label: "MMR", field: "mmr", sort: "asc", width: 100 },
    { label: "Attack", field: "Attack", sort: "asc", width: 100 },
    { label: "Shield", field: "Shield", sort: "asc", width: 100 },
    { label: "Description", field: "Description", sort: "asc", width: 100 },
    { label: "Reason", field: "Reason", sort: "asc", width: 100 },
    { label: "Proposed By", field: "user", sort: "asc", width: 100 },
    { label: "Votes", field: "votes", sort: "asc", width: 100 },
  ];

  return (
    // <div>
    //   <MDBDataTableV5
    //     bordered
    //     hover
    //     data={{ columns: columns, rows: proposals }}
    //     //   checkbox
    //     responsive
    //     order={["votes", "desc"]}
    //     checkbox
    //     bodyCheckboxID="checkbox1"
    //     headCheckboxID="id2"
    //     multipleCheckboxes
    //     getValueCheckBox={(val) => updateVote(val)}
    //   />
    // </div>
    <Table striped bordered>
      <thead>
        <tr>
          {columns.map((elem, index) => (
            <th key={index}>{elem.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {proposals.map((datum, i) => {
          return (
            <tr key={i}>
              <td></td>
              {columns.map((column, j) => (
                <td key={j}>{datum[column.field]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
