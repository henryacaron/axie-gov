import React, { useState, useEffect } from "react";
import { Table as T } from "react-bootstrap";

export default function Table({ headers, data }) {

  return (
    <T striped bordered hover>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} data-sortable="true">
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((datum, i) => {
          return (
            <tr key={i}>
              {headers.map((header, j) => (
                <td key={j}>{datum[header.field]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <tbody>
        <tr>
          {headers.forEach((header) => (
            <td>{header.title}</td>
          ))}
        </tr>
      </tbody>
    </T>
  );
}
