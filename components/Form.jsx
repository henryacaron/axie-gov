import { useState } from "react";
import ReactDOM from 'react-dom';

export default function Form(setChoice, choice) {

  return (
    <form>
      <label>True or false?
        <span>True</span>
        <input
          type="radio" 
          value={choice}
          onChange={(e) => setChoice(true)}
          checked={choice}
    
        />
        <span>False</span>
    
        <input
          type="radio" 
          value={!choice}
          onChange={(e) => setChoice(false)}
          checked={!choice}
        />
      </label>
    </form>
  )
}