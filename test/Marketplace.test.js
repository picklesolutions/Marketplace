/* eslint-env node, mocha */
/* global artifacts, contract, it, assert, web3 */

const Marketplace = artifacts.require('Marketplace');
const CryptoDoggos = artifacts.require('CryptoDoggos');

let instance;
let cryptoDoggosInstance;

contract('Marketplace', (accounts) => {
  it('Should deploy an instance of the CryptoDoggos contract', () => CryptoDoggos.deployed()
    .then((contractInstance) => {
      cryptoDoggosInstance = contractInstance;
    }));

  it('Should deploy an instance of the Marketplace contract', () => Marketplace.deployed()
    .then((contractInstance) => {
      instance = contractInstance;
    }));

  it('Should set the address of the CryptoDoggos contract', () => instance.setCryptoDoggosContractAddress(cryptoDoggosInstance.address));

  it('Should open the marketplace', () => instance.openMarketplace());

  it('Should create a Doggo and give it to account 1', () => cryptoDoggosInstance.createDoggo(accounts[1], 'Jasper', 4, 10, 1, 0));

  it('Should give approval to the marketplace to manage Doggo 0', () => cryptoDoggosInstance.approve(instance.address, 0, {
    from: accounts[1],
  }));

  it('Should create an offer for Doggo 0 on the marketplace', () => instance.createOffer(0, web3.toWei(1), {
    from: accounts[1],
  }));

  it('Should buy Doggo 0 from offer 0', () => instance.buyItem(0, {
    from: accounts[2],
    value: web3.toWei(1),
  }));

  it('Should check if account 2 owns Doggo 0', () => cryptoDoggosInstance.ownerOf(0)
    .then((owner) => {
      assert.equal(owner, accounts[2], 'Owner of Doggo 0 is wrong');
    }));

  it('Should check the total number of offers', () => instance.getOffersTotal()
    .then((offers) => {
      assert.equal(offers, 1, 'Total number of offers is wrong');
    }));

  it('Should get the informations about offer 0', () => instance.getOffer(0)
    .then((offer) => {
      assert.equal(offer[0], 0, 'Offer 0 itemId is wrong');
      assert.equal(offer[1], web3.toWei(1), 'Offer 0 price is wrong');
      assert.equal(offer[2], accounts[1], 'Offer 0 seller is wrong');
      assert.equal(offer[3], accounts[2], 'Offer 0 buyer is wrong');
      assert.equal(offer[4], false, 'Offer 0 state is wrong');
    }));

  it('Should withdraw funds from the contract', () => instance.withdrawFunds());
});
