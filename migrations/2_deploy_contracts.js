/* eslint-env node */
/* global artifacts */

const Marketplace = artifacts.require('core/Marketplace');
const CryptoDoggos = artifacts.require('ERC721/CryptoDoggos');

function deployContracts(deployer) {
  deployer.deploy(Marketplace);
  deployer.deploy(CryptoDoggos);
}

module.exports = deployContracts;
