import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMetamask, useDisconnect, useAddress, useMarketplace, useNFTDrop } from '@thirdweb-dev/react'
import { useState, useEffect } from 'react'


export default function Home() {
  const address = useAddress()
  const metamask = useMetamask()
  const disconnect = useDisconnect()
  const nftDrop = useNFTDrop("0x5685CF9e33664624cF6d56bD45037b3C1E71e3d6")
  const [hasClaimed, sethasClaimed] = useState(false)
  const [isClaiming, setisClaiming] = useState(false)

  const mint_NFT = async () => {
    try {
      setisClaiming(true)
      await nftDrop?.claim(1)
      sethasClaimed(true)
      console.log("nft minted!")
    } catch (error) {
      sethasClaimed(false)
      console.error(error)
    }
    finally {
      setisClaiming(false)
    }
  }

  useEffect(() => {
    if(!address) {
      return;
    }
    const check_Balance = async () => {
      const nfts = await nftDrop?.getOwned(address)
      sethasClaimed(nfts?.length>0)
    };
    check_Balance()
  }, [address, nftDrop]

  )

  if(!address){
    return(
      <div>
        <h1>Welcome to the Python Club</h1>
        <h2> Please connect your wallet</h2>
        <button onClick={metamask}> Connect Wallet</button>
      </div>
    )
  }

  if(hasClaimed) {
    return(
      <h1> WELCOME VERIFIED PYTHONISTA</h1>
    )
  }

  return (
    <div className={styles.container}>
      <p>your wallet: {address}</p>
      <button onClick={disconnect}>Disconnect wallet</button>
      <button onClick={mint_NFT} disabled={isClaiming}>Claim your Access NFT</button>
    </div>
  )
}
