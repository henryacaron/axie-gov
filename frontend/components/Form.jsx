import { useState } from "react";
import ReactDOM from 'react-dom';
import {Container, Button} from "react-bootstrap"


export default function Form({setChoice, choice}) {

  return (
    <form className = "d-flex flex-column bg-light width-100 justify-content-center align-items-center">
    <h3>True or false?</h3>

      <Container className = "d-flex flex-row justify-content-around">
        <Button className = {choice ? "bg-btn btn-primary" : "btn btn-light"} onClick={(e) => setChoice(true)}>
        <h5>True</h5>
        
        </Button>
        <Button  onClick={(e) => setChoice(false)} className = {choice == false ? "bg-btn btn-primary" : "btn btn-light"} >
          <h5>False</h5>
         
        </Button>
      </Container>
  </form>
  )
}