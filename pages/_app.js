import '../styles/globals.css'
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'

import Web3 from 'web3'
import { ethers } from "ethers";

function getLibrary(provider, connector) {
  // console.log(`window: ${JSON.stringify(window.ethereum)}`)
  const prov = new ethers.providers.Web3Provider(provider)
  const signer = prov.getSigner()

  // const prov = new Web3(provider)
  return prov;
}

// const Web3ReactProviderReloaded = createWeb3ReactRoot('ronin')


function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <Web3ReactProviderReloaded getLibrary={getLibrary}> */}
       <Component {...pageProps} />
      {/* </Web3ReactProviderReloaded> */}
    </Web3ReactProvider>
  )
}

export default MyApp