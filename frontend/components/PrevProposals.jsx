import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import { injected } from "../components/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
import MaterialTable from "material-table";

var axios = require("axios").default;

export default function PrevProposals({ qData }) {
  const [prevProposals, setPrevProposals] = useState(undefined);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log(`getting proposals`);
    getProposalData(qData.skillName);
  }, [qData]);

  function setColsAndRows(data) {
    let columns = [];
    if (data.length == 0) return;
    console.log(`data[0]: ${JSON.stringify(data[0])}`);
    const keys = Object.keys(data[0]);
    console.log(keys);
    keys.forEach((key) => {
      columns.push({ title: key, field: key });
    });
    console.log(`columns: ${columns}`);

    setCols(columns);
    setRows(data);
  }


  return (
    <Container>
      <h3>
        Previous Proposals{" "}
        <Button onClick={() => getProposalData("Aqua Vitality"
        )}>
          Fetch Previous Proposals
        </Button>
      </h3>
      <span>{JSON.stringify(prevProposals)}</span>
      {/* <MaterialTable columns={cols} data={rows} title="Previous Proposals" /> */}
    </Container>
  );
}
