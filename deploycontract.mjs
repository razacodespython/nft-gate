import { ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from 'dotenv';

dotenv.config()

const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.PRIVATE_KEY,
        ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
    )
);

async function deployNFTDROPcontract(){
    try {
        const nftdropcontract = await sdk.deployer.deployNFTDrop(
            {
                name:'Pythonista NFTs',
                primary_sale_recipient: '0x55c9bBb71a5CC11c2f0c40362Bb691b33a78B764'
            }
        );
        console.log('nft contract deployed', nftdropcontract)
    } catch (error) {
        console.error('failed contract deployment', error)
    }
}

deployNFTDROPcontract()