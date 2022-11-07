// const { ethers } = require('hardhat');
const {ethers} = require('ethers');
const {abi,bytecode} = require('../artifacts/contracts/NFT.sol/BtechProejctNFT.json')
const url ='https://polygon-mumbai.g.alchemy.com/v2/Sq5Vw5NGLCscYbvOvYbkNTs21q25_IFD'

async function main(contract,name,symbol){

    const provider = new ethers.providers.JsonRpcProvider(url)
  
    const wallet = ethers.Wallet.fromMnemonic('a6b0c53ef59d726db7d93c422ad34c3cfb27ba2da641dddb8db64d1108c58536')
    const account = wallet.connect(provider)
    console.log(account)
    // const [deployer] = await provider.getSigners()
    // // get the contract factory to deploy

    // const NFT = await ethers.getContractFactory(abi,bytecode)
    // const addr = deployer.address
    // const nft = await NFT.deploy(name,symbol)

    // // await nft.deployed("B.tech Project NFT","VII sem")
    // console.log("deployed contract address : ",nft.address)

    // return nft.address

}

main('BtechProejctNFT',"B.tech Project NFT V2","VII sem")
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//   '0x93CF0E514e4D60D0986a13D0cb95A58ec4eA0197' 
//  https://mumbai.polygonscan.com/address/0x93CF0E514e4D60D0986a13D0cb95A58ec4eA0197