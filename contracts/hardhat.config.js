require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    mumbai:{
      url:'https://polygon-mumbai.g.alchemy.com/v2/Sq5Vw5NGLCscYbvOvYbkNTs21q25_IFD',
      accounts:['a6b0c53ef59d726db7d93c422ad34c3cfb27ba2da641dddb8db64d1108c58536']
    }
  },
  etherscan:{
    apiKey:{
      polygonMumbai: 'AHPBY8XEIBYK11W5PKNQTAD3QX3UPS2SD7'
  }
}
  
};
