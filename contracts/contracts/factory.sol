// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./NFT.sol";
import "./MinimalProxy.sol";
import "hardhat/console.sol";
import '@openzeppelin/contracts/utils/Address.sol';

// original code
// https://github.com/optionality/clone-factory/blob/master/contracts/CloneFactory.sol

contract NFTClone is NFT{

          event  NFTCreated(address indexed _to);
            
            using Address for address;
            address public implementationContract;
        
            constructor (address _implementationContract) public {
                    implementationContract = _implementationContract;
            }

            function createContract(
                string memory _name,
                string memory _symbol,
                address _owner
            ) public payable returns(address clone){
                // create the clone
                NFT clone = NFT(Clones.clone(implementationContract));
                // Escrow escrow = Escrow(createClone(implementationContract));
                // inililize the clone
                clone.initialize(
                  _name,
                  _symbol,
                  _owner
                  );
            console.log(address(clone));
                  emit NFTCreated(address(clone));
  }

}