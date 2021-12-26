import React, { useState, useEffect } from "react";
import { Table as T } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";


export default function Question({ qData, setChoice, choice, attr }) {
    const choices = [-20, -15, -10, -5, 0, 5, 10, 15, 20];

  return (
    <Container>
      <h5>
        {attr} Change (Currently {qData[attr]})
      </h5>
        <Container className="d-flex flex-row justify-content-center">
          {choices.map((item) => (
            <Button
              key={item}
              className={
                choice !== undefined
                  ? choice == item
                    ? "bg-btn btn-primary"
                    : "btn btn-light"
                  : "btn btn-light"
              }
              onClick={(e) => setChoice(qData["Part Name"], attr, item)}
            >
              {item > 0 ? "+" : null}
              {item}
            </Button>
          ))}
        </Container>
      </Container>
  );
}
