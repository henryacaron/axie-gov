import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import {Navbar, Container, Button} from "react-bootstrap"
import { injected } from "../components/wallet/Connectors"
import { useWeb3React } from "@web3-react/core";
import MaterialTable from "material-table"

var axios = require("axios").default;

export default function PrevProposals({qData}) {
  const [prevProposals, setPrevProposals] = useState(undefined);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log(`getting proposals`)
    getProposalData(qData.skillName)
  }, [qData])
  
  function setColsAndRows(data){
    let columns = [];
    console.log(`data[0]: ${JSON.stringify(data[0])}`)
    data[0].keys(key => {columns.push({title: key, field: key})})
    console.log(`columns: ${columns}`)
      
      setCols(columns);
      setRows(data);
  }
  
  async function getProposalData(skillName) {
    axios.post('http://localhost:3001/getProposalData/', {skillName : skillName})
    .then((res) => {
      if(res.type == 'error'){
        alert(`Error: ${res.data}`)
      } else {
        console.log(`hello`)
        console.log(res.data)
        setPrevProposals(res.data);
        setColsAndRows(res.data);
      }
    })
    .catch((err) => {
        console.log(err.response);
    });
  }
  return (
    <Container>
       <h3>Previous Proposals</h3>
       <span>{JSON.stringify(prevProposals)}</span>
       <MaterialTable
      columns={cols}
      data={rows}
      title="Previous Proposals"
    />
   </Container>
  )
}