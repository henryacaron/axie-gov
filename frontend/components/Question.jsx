import React, { useState, useEffect } from "react";
import { Table as T } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";

export default function Question({ qData, setChoice, choice, attr }) {
  
  const setChoices = () => {
    let ret = [];
    for(let i = -20; i < 21; i+=5){
      ret.push(i + qData[attr])
    }
    return ret;
  }
  const choices = setChoices();

  return (
    <Container>
      <h5>
        Propose a New {attr} Value (Currently {qData[attr]})
      </h5>
      <Container className="row">
        {choices.map((item) => (
          <Button
            key={item}
            className={`col med-2 m-1
                ${
                  choice !== undefined
                    ? choice == item
                      ? "bg-btn btn-primary"
                      : "btn btn-light"
                    : "btn btn-light"
                }
            `}
            onClick={(e) => setChoice(qData["Part Name"], attr, item)}
          >
            {item}
          </Button>
        ))}
      </Container>
    </Container>
  );
}
