// Table.js

import React from "react";
// import { useTable } from "react-table";
import MaterialTable from "material-table"
import Papa from "papaparse"

export default function Table() {
  // const data = Papa.parse("data.csv", {
  //   complete: function(results) {
  //     console.log("Finished:", results.data);
  //   }
  // });
  const data =Papa.parse("Name,Surname,Birth Year,Birth City\nMehmet,Baran,1987,Istanbul", {header: true});
  
  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div style={{ maxWidth: "100%" }}>
    {console.log(data.meta.fields)}
    <MaterialTable
      columns={
      [
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname" },
        { title: "Birth Year", field: "birthYear", type: "numeric" },
        {
          title: "Birth City",
          field: "birthCity",
          lookup: { 34: "İstanbul", 63: "San Francisco" },
        },
      ]}
      data={[
        {
          name: data[0],
          surname: "Baran",
          birthYear: 1987,
          birthCity: 63,
        },
        
          {
            name: "Jimmy",
            surname: "Neutron",
            birthYear: 1987,
            birthCity: 34,
          },
          
      ]}
      title="Axie Data"
    />
  </div>
  );
}