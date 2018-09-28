# Marketplace

## Introduction

This is an example showing how to create a simple marketplace that allow users to buy and sell ERC721 items of a specific contract.

The example is built around a fictional ERC721 token called `CryptoDoggos` (`contracts/ERC721/CryptoDoggos.sol`).

## How it works

Users owning some CryptoDoggos can call the `createOffer()` function from the `Marketplace` contract to create a new offer. They will need to specify the id of the item they want to sell and an expected price.

The total amount of offers can be obtained using the `getOffersTotal()` function, and more information about a specific offer can be obtained using `getOffer()`.

If an user wants to buy an item, he can call the `buyItem()` function using the id of the offer and sending the right amount of Ether.

If everything went right, the Marketplace will transfer the ownership of the item from the seller to the buyer, will give the funds to the seller and take a 2.50% fee.

For more information, please check the smart-contract located at `contracts/core/Marketplace.sol`. Also, we recommend you to have a look at `test/Marketplace.test.js` to have a concrete example.

## Contributing

Feel free to contribute! Issues, pull requests and advice are welcome!
