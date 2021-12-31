import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { MDBDataTableV5, MDBInput } from "mdbreact";

export default function Vote({ myVotes, proposals, editVote, allVotes }) {
  const columns = [
    { label: "Card", field: "Part Name", sort: "asc", width: 100 },
    { label: "Attack", field: "Attack", sort: "asc", width: 100 },
    { label: "Shield", field: "Shield", sort: "asc", width: 100 },
    { label: "Description", field: "Description", sort: "asc", width: 100 },
    { label: "Reason", field: "Reason", sort: "asc", width: 100 },
    { label: "Proposed By", field: "user", sort: "asc", width: 100 },
    { label: "Votes", field: "votes", sort: "asc", width: 100 },
  ];

  return (
    <div>
      {proposals.length > 0 ? (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Vote</th>

              {columns.map((elem, index) => (
                <th key={index}>{elem.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal, i) => (
              <tr key={i}>
                <td>
                  <Button
                    className={`btn ${
                      myVotes.some((vote) => vote.id == proposal.id)
                        ? "btn-primary"
                        : "btn-light"
                    } `}
                    onClick={() => editVote(proposal)}
                  ></Button>
                </td>
                <td>{proposal.data["Part Name"]}</td>
                <td>{proposal.data.Attack}</td>
                <td>{proposal.data.Shield}</td>
                <td>{proposal.data.Description}</td>
                <td>{proposal.data.Reason}</td>
                <td>
                  {proposal.acct.name} ({proposal.acct.elo})
                </td>
                <td>
                  {allVotes.filter((vote) => vote.vote == proposal.id).length}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No proposals submitted</p>
      )}
    </div>
  );
}
