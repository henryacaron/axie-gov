import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { injected } from "../components/wallet/Connectors"
import { useWeb3React } from "@web3-react/core";
import Table from "../components/Table";

export default function Home() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      console.log(`injected: ${JSON.stringify(injected)}`)
      console.log()
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }
  
  async function disconnect() {
    try {
      console.log("network", library);
      console.log("connector", connector);
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
    {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
      <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
      <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
      <Table/>
    </div>
  )
}
