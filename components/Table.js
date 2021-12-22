// Table.js

import React from "react";
// import { useTable } from "react-table";
import MaterialTable from "material-table"

export default function Table() {

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      columns={[
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
          name: "Mehmet",
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
      title="Demo Title"
    />
  </div>
  );
}