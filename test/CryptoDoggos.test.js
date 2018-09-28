/* eslint-env node, mocha */
/* global artifacts, contract, it, assert */

/* A few tests to see if everything is working as expected */

const CryptoDoggos = artifacts.require('CryptoDoggos');

let instance;

contract('CryptoDoggos', (accounts) => {
  it('Should deploy an instance of the CryptoDoggos contract', () => CryptoDoggos.deployed()
    .then((contractInstance) => {
      instance = contractInstance;
    }));

  it('Should get the name of the ERC721 token', () => instance.name()
    .then((name) => {
      assert.equal(name, 'CryptoDoggos', 'Token name is wrong!');
    }));

  it('Should get the symbol of the ERC721 token', () => instance.symbol()
    .then((symbol) => {
      assert.equal(symbol, 'WOOF', 'Token name is wrong!');
    }));

  it('Should get the symbol of the ERC721 token', () => instance.symbol()
    .then((symbol) => {
      assert.equal(symbol, 'WOOF', 'Token name is wrong!');
    }));

  it('Should create a Doggo and give it to account 1', () => instance.createDoggo(accounts[1], 'Jasper', 4, 10, 1, 0));

  it('Should check balance of account 1', () => instance.balanceOf(accounts[1])
    .then((balance) => {
      assert.equal(balance.toNumber(), 1, 'Balance of account 1 is wrong');
    }));

  it('Should check if account 1 owns Doggo 0', () => instance.ownerOf(0)
    .then((owner) => {
      assert.equal(owner, accounts[1], 'Owner of Doggo 0 is wrong');
    }));
});
