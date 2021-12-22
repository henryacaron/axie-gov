import React, {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { injected } from "../components/wallet/Connectors"
import { useWeb3React } from "@web3-react/core";
import Table from "../components/Table";
import Form from "../components/Table";


export default function Home() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const [choice, setChoice] = useState(false);
  async function connect() {
    try {
      const val = await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }
  
  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }
  
  async function sign(message) {
    try {
      const signer = library.getSigner()
      const signedMsg = await signer.signMessage(message.toString());
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className="flex flex-col items-center justify-center">
    {active && 
    <div>
      <span>Connected with <b>{account}</b></span> 
      <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
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
    <span>Selection is {choice ? "true" : "false"}</span>
    <button onClick={() => sign(choice)} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Sign</button>

    </div>}
    {!active &&
        <div>
          <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
          <span>Not connected</span>
        </div>}
      
      {/* <Table/> */}
    </div>
  )
}
