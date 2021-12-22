// Table.js

import React, {useState, useEffect} from "react";
// import { useTable } from "react-table";
import MaterialTable from "material-table"
import Papa from "papaparse"

export default function Table() {
  const data = Papa.parse("axiedata.csv", {
    complete: function(results) {
      console.log("Finished:", results.data);
    }
  });
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const data = Papa.parse("axiedata.csv", {
      complete: function(results) {
        console.log("Finished:", results.data);
      }
    });
    let c = [];
    data?.meta?.fields?.forEach(item => {c.push({title: item, field: item})})
    console.log(data);
    setCols(c);
    setRows(data.data)
  },[])

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      columns={cols}
      data={rows}
      title="Axie Data"
    />
  </div>
  );
}