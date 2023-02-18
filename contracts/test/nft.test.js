const {expect} = require('chai');
const { ethers } = require('hardhat');
const {abi} = require('../artifacts/contracts/NFT.sol/NFT.json');
function get_Adderss(
    address
){
    let addr = '0x';
        for(let i = 0; i < address.length; ++i){
            if(address[i] !== '0' && address[i] !== 'x'){
                let temp = address.slice(i,address.length)
                addr += temp;
                break;
            }
        }

        return addr;
}

describe("Testing NFT contract",() =>{

    let nft,factory,signer,addr1;

    it("Deployment",async() => {

        // deploy the NFT
            const NFT = await ethers.getContractFactory("NFT")
            nft = await NFT.deploy()
            await nft.deployed()

        //    deploy the factory

        const Factory = await ethers.getContractFactory('NFTClone')
        factory = await Factory.deploy(nft.address)
        await factory.deployed();

        [signer,addr1] = await ethers.getSigners()

        console.log("NFT : ",nft.address);
        console.log("Factory : ",factory.address)
        console.log("signer : ",await signer.getAddress())

        console.log("address : ",await addr1.getAddress())
        
    })

    it("Creating NFT collection : ",async()=>{

        const txn = await factory.createContract("Ajay NFT","AFT",await signer.getAddress())
        const receipt = await txn.wait()

        let nftAddress = receipt.logs[0].topics[1]
        const contract = new ethers.Contract(get_Adderss(nftAddress),abi,signer)

        console.log(await contract.name())
        console.log(await contract.symbol())
        console.log("owner : ",await contract.admin())

        // mint some NFTs
        await contract.safeMint(
            await addr1.getAddress(),
            1,
            "www.example.com"
        )
        
        console.log("url : ",await contract.tokenURI(1))
        // Error : Already minted
        await expect(contract.safeMint(
            await addr1.getAddress(),
            1,
            "www.example.com"
            )).to.be.reverted;
        
        // Error : Already minted
        await expect(contract.connect(addr1).safeMint(
            await addr1.getAddress(),
            2,
            "www.example.com"
        )).to.be.reverted

        

    })
})